import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const listByClient = query({
  args: { clientId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contracts")
      .withIndex("by_clientId", (q) => q.eq("clientId", args.clientId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("contracts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("contracts").collect();
  },
});

export const create = mutation({
  args: {
    clientId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    pdfStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("contracts", {
      clientId: args.clientId,
      title: args.title,
      description: args.description,
      pdfStorageId: args.pdfStorageId,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contracts"),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("signed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const patch: Record<string, unknown> = { status: args.status, updatedAt: now };
    if (args.status === "sent") patch.sentAt = now;
    if (args.status === "signed") patch.signedAt = now;
    await ctx.db.patch(args.id, patch);
  },
});

// Client signs a contract: saves signature image + updates status
export const signContract = mutation({
  args: {
    id: v.id("contracts"),
    signatureStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const contract = await ctx.db.get(args.id);
    if (!contract) throw new Error("Contract not found");
    if (contract.clientId !== userId) throw new Error("Not your contract");
    if (contract.status !== "sent") throw new Error("Contract is not pending signature");

    const user = await ctx.db.get(userId);
    const signedByName = user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.email || "Client";

    const now = Date.now();
    await ctx.db.patch(args.id, {
      status: "signed",
      signatureStorageId: args.signatureStorageId,
      signedByName: signedByName,
      signedAt: now,
      updatedAt: now,
    });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

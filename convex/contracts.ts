import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("contracts", {
      clientId: args.clientId,
      title: args.title,
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
    yousignRequestId: v.optional(v.string()),
    signedPdfStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const now = Date.now();
    const patch: Record<string, unknown> = { ...updates, updatedAt: now };
    if (args.status === "sent") patch.sentAt = now;
    if (args.status === "signed") patch.signedAt = now;
    await ctx.db.patch(id, patch);
  },
});

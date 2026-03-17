import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listByClient = query({
  args: { clientId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_clientId", (q) => q.eq("clientId", args.clientId))
      .collect();
  },
});

export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("payments").collect();
  },
});

export const create = mutation({
  args: {
    clientId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    type: v.union(v.literal("audit"), v.literal("quarterly")),
    stripeSessionId: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("payments", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("payments"),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const patch: Record<string, unknown> = { ...updates };
    if (args.status === "completed") patch.paidAt = Date.now();
    await ctx.db.patch(id, patch);
  },
});

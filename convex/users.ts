import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const currentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await ctx.db.get(userId);
  },
});

export const getById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// List all users who are not admin (clients + users who signed up but have no role yet)
export const listClients = query({
  handler: async (ctx) => {
    const allUsers = await ctx.db.query("users").collect();
    return allUsers.filter((u) => u.role !== "admin" && u.email);
  },
});

export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    notes: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("client"))),
    nextMeeting: v.optional(v.number()),
    nextMeetingNote: v.optional(v.string()),
    nextMeetingLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
  },
});

export const clearMeeting = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      nextMeeting: undefined,
      nextMeetingNote: undefined,
      nextMeetingLink: undefined,
      updatedAt: Date.now(),
    });
  },
});

export const getAdmin = query({
  handler: async (ctx) => {
    const admins = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .collect();
    return admins[0] ?? null;
  },
});

export const setRole = mutation({
  args: {
    id: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("client")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { role: args.role, updatedAt: Date.now() });
  },
});

export const createClient = mutation({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phone: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("users", {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      phone: args.phone,
      notes: args.notes,
      role: "client",
      createdAt: now,
      updatedAt: now,
    });
  },
});

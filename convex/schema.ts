import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  // Override users table from authTables with our custom fields
  users: defineTable({
    // Auth fields (managed by @convex-dev/auth)
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    // Custom fields
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("client"))),
    phone: v.optional(v.string()),
    notes: v.optional(v.string()),
    nextMeeting: v.optional(v.number()),
    nextMeetingNote: v.optional(v.string()),
    nextMeetingLink: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),

  contracts: defineTable({
    clientId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    markdownContent: v.optional(v.string()),
    pdfStorageId: v.optional(v.id("_storage")),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("signed"),
      v.literal("cancelled")
    ),
    signatureStorageId: v.optional(v.id("_storage")),
    signedByName: v.optional(v.string()),
    sentAt: v.optional(v.number()),
    signedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clientId", ["clientId"])
    .index("by_status", ["status"]),

  documents: defineTable({
    clientId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    markdownContent: v.optional(v.string()),
    category: v.union(
      v.literal("contract"),
      v.literal("report"),
      v.literal("invoice"),
      v.literal("document"),
      v.literal("other")
    ),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("signed"),
      v.literal("ongoing"),
      v.literal("cancelled")
    ),
    storageId: v.id("_storage"),
    fileType: v.string(),
    date: v.optional(v.number()),
    uploadedBy: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_clientId", ["clientId"])
    .index("by_category", ["category"])
    .index("by_status", ["status"]),

  payments: defineTable({
    clientId: v.id("users"),
    amount: v.number(),
    currency: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    type: v.union(v.literal("audit"), v.literal("quarterly")),
    stripeSessionId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    description: v.optional(v.string()),
    paidAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_clientId", ["clientId"])
    .index("by_status", ["status"]),

  activityLog: defineTable({
    userId: v.id("users"),
    action: v.string(),
    details: v.optional(v.string()),
    entityType: v.optional(v.string()),
    entityId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_createdAt", ["createdAt"]),
});

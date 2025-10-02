import { mutation } from "../_generated/server";
import { v } from "convex/values";


export const createUser = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        clerkId: v.string(),
        stripeCustomerId: v.string(),
    },

    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (existingUser) {
            console.log("User already exists");
            return existingUser._id;
        }

        const userId = await ctx.db.insert("users", {
            email: args.email,
            name: args.name,
            clerkId: args.clerkId,
            stripeCustomerId: args.stripeCustomerId,
        });

        return userId;
    },
});

export const getUserByClerkId = mutation({
    args: {
        clerkId: v.string(),
    },

    handler: async (ctx, args) => {
        const clerkUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        return clerkUser;
    },
});

export const getUserByStripeCustomerId = mutation({
    args: {
        stripeCustomerId: v.string(),
    },

    handler: async (ctx, args) => {
        const stripeUser = await ctx.db
            .query("users")
            .withIndex("by_stripeCustomerId", (q) =>
                q.eq("stripeCustomerId", args.stripeCustomerId)
            )
            .unique();

        return stripeUser;
    },
});
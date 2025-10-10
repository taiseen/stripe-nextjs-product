import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";




export const getUserSubscription = query({

    args: { userId: v.id("users") },

    handler: async (ctx, args) => {

        const user = await ctx.db.get(args.userId);
        if (!user?.currentSubscriptionId) return null;

        const subscription = await ctx.db.get(user.currentSubscriptionId);
        if (!subscription) return null;

        return subscription;
    },
});




export const createOrUpdateSubscription = mutation({

    args: {
        userId: v.id("users"),
        stripeSubscriptionId: v.string(),
        status: v.string(),
        planType: v.union(v.literal("month"), v.literal("year")),
        currentPeriodStart: v.number(),
        currentPeriodEnd: v.number(),
        cancelAtPeriodEnd: v.boolean(),
    },

    handler: async (ctx, args) => {
        const existingSubscription = await ctx.db
            .query("subscriptions")
            .withIndex("by_stripeSubscriptionId", (q) => q.eq("stripeSubscriptionId", args.stripeSubscriptionId))
            .unique();

        if (!existingSubscription) {
            // ✅✅✅ create new subscription
            const subscriptionId = await ctx.db.insert("subscriptions", args);
            await ctx.db.patch(args.userId, { currentSubscriptionId: subscriptionId });
        } else {
            // 🟧🟧🟧 update existing subscription
            await ctx.db.patch(existingSubscription._id, args);
        }

        return { success: true };
    },
});




export const removeSubscription = mutation({
    
    args: {
        stripeSubscriptionId: v.string(),
    },

    handler: async (ctx, args) => {

        const subscription = await ctx.db.query('subscriptions')
            .withIndex('by_stripeSubscriptionId', (q) => q.eq('stripeSubscriptionId', args.stripeSubscriptionId))
            .unique();

        if (!subscription) throw new ConvexError('Subscription not found')


        const user = await ctx.db
            .query("users")
            .withIndex("by_currentSubscriptionId", (q) => q.eq("currentSubscriptionId", subscription._id))
            .unique();

        if (user) {
            // 🟧🟧🟧 update existing subscription
            await ctx.db.patch(user._id, { currentSubscriptionId: undefined });
        }

        // 🟥🟥🟥 delete info form database
        await ctx.db.delete(subscription._id);

        return { success: true };
    }
})
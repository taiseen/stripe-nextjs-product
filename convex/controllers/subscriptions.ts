import { ConvexError, v } from "convex/values";
import { query } from "../_generated/server";


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
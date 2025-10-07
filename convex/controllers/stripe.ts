import ratelimit from "../../src/lib/ratelimit";
import stripe from "../../src/lib/stripe";
import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { api } from "../_generated/api";


const url = process.env.NEXT_PUBLIC_APP_URL;


export const createCheckoutSession = action({

    args: { courseId: v.id("courses") },

    handler: async (ctx, args): Promise<{ checkoutUrl: string | null }> => {

        const { courseId } = args;
        const { auth, runQuery } = ctx;
        const { user, courses } = api.controllers;

        const identity = await auth.getUserIdentity();
        if (!identity) throw new ConvexError("Unauthorized");

        const clerkId = identity.subject;
        const userData = await runQuery(user.getUserByClerkId, { clerkId });
        if (!userData) throw new ConvexError("User not found");

        const course = await runQuery(courses.getCourseById, { courseId });
        if (!course) throw new ConvexError("Course not found");


        // 🛡️🛡️🛡️ request rate limit...
        const rateLimitKey = `checkout-rate-limit:${userData._id}`;
        const { success } = await ratelimit.limit(rateLimitKey);
        if (!success) throw new Error(`Rate limit exceeded.`);


        // 📦📦📦 actual selling product...
        const sellingProduct = {
            product_data: {
                name: course.title,
                images: [course.imageUrl],
            },
            currency: "usd",
            unit_amount: Math.round(course.price * 100),
        };

        const session = await stripe.checkout.sessions.create({
            mode: "payment", // one-time payment
            customer: userData.stripeCustomerId,
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: sellingProduct,
                    quantity: 1,
                },
            ],
            success_url: `${url}/courses/${courseId}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/courses`,

            metadata: {
                courseId,
                userId: userData._id,
                courseTitle: course.title,
                courseImageUrl: course.imageUrl,
            },
        });

        return { checkoutUrl: session.url };

        // https://checkout.stripe.com/c/pay/cs_test_a1h9z65.....encoded-url.....
    }
})


export const createProPlanCheckoutSession = action({

    args: { planId: v.union(v.literal("month"), v.literal("year")) },

    handler: async (ctx, args): Promise<{ checkoutUrl: string | null }> => {

        const { planId } = args;
        const { auth, runQuery } = ctx;
        const { user } = api.controllers;

        const identity = await auth.getUserIdentity();
        if (!identity) throw new ConvexError("Unauthorized");

        const userData = await runQuery(user.getUserByClerkId, { clerkId: identity.subject });
        if (!userData) throw new ConvexError("User not found");


        // 🛡️🛡️🛡️ request rate limit...
        const rateLimitKey = `pro-plan-rate-limit:${userData._id}`;
        const { success } = await ratelimit.limit(rateLimitKey);
        if (!success) throw new Error(`Rate limit exceeded.`);

        // 📦📦📦 actual selling pro plan MONTH | YEAR...

        const isMonthly = planId === "month";
        const isYearly = planId === "year";

        const monthlyPriceId = process.env.STRIPE_MONTHLY_PRICE_ID;
        const yearlyPriceId = process.env.STRIPE_YEARLY_PRICE_ID;

        const priceId = isMonthly
            ? monthlyPriceId
            : isYearly
                ? yearlyPriceId
                : undefined;

        if (!priceId) {
            throw new ConvexError("PriceId not provided");
        }

        // NOTE: We must create the prices in our Stripe Dashboard first, then use the price IDs here.
        // & without the price ID we cannot create the checkout [session] for subscriptions.

        const session = await stripe.checkout.sessions.create({
            mode: "subscription", // recurring payment 🔃
            payment_method_types: ["card"],
            customer: userData.stripeCustomerId,
            line_items: [
                { price: priceId, quantity: 1 }
            ],
            success_url: `${url}/pro/success?session_id={CHECKOUT_SESSION_ID}&year=${planId === "year"}`,
            cancel_url: `${url}/pro`,

            metadata: {
                planId,
                userId: userData._id,
            },
        });

        return { checkoutUrl: session.url };
    }
})

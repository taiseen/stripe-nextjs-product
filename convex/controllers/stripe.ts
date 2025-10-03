import ratelimit from "../../src/lib/ratelimit";
import stripe from "../../src/lib/stripe";
import { ConvexError, v } from "convex/values";
import { action } from "../_generated/server";
import { api } from "../_generated/api";


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

        const url = process.env.NEXT_PUBLIC_APP_URL;

        const session = await stripe.checkout.sessions.create({
            customer: userData.stripeCustomerId,
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: sellingProduct,
                    quantity: 1,
                },
            ],
            mode: "payment",
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
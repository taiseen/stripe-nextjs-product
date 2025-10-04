import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export function verifyStripeWebhookSignature(
    payload: string,
    signature: string,
    secret: string
): Stripe.Event {
    return stripe.webhooks.constructEvent(payload, signature, secret);
}


export async function handleStripeWebhookEventRoute(event: Stripe.Event) {

    try {
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
                break;

            default:
                console.warn(`🔴 Unhandled event type ${event.type}`);
                break;
        }
    } catch (error) {
        const message = "🔴 Error processing at webhook:- " + error
        console.error(message);
        return new Response(message, { status: 400 });
    }

    return new Response(null, { status: 200 });
}


async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {

    const courseId = session.metadata?.courseId;
    const stripeCustomerId = session.customer as string;

    if (!courseId || !stripeCustomerId) throw new Error("Missing courseId or stripeCustomerId");


    const user = await convex.query(api.controllers.user.getUserByStripeCustomerId, { stripeCustomerId });
    if (!user) throw new Error("User not found");


    await convex.mutation(api.controllers.purchases.recordPurchase, {
        userId: user._id,
        courseId: courseId as Id<"courses">,
        amount: session.amount_total as number,
        stripePurchaseId: session.id,
    });
}


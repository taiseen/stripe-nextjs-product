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
            // for single product purchase
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
                break;

            // for subscription purchase
            case "customer.subscription.created":
            case "customer.subscription.updated":
                await handleSubscription(event.data.object as Stripe.Subscription, event.type);
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

    const { user, purchases } = api.controllers;

    if (!courseId || !stripeCustomerId) throw new Error("Missing courseId or stripeCustomerId");


    const userData = await convex.query(user.getUserByStripeCustomerId, { stripeCustomerId });
    if (!userData) throw new Error("User not found");


    await convex.mutation(purchases.recordPurchase, {
        userId: userData._id,
        courseId: courseId as Id<"courses">,
        amount: session.amount_total as number,
        stripePurchaseId: session.id,
    });
}





async function handleSubscription(subscription: Stripe.Subscription, eventType: string) {

    if (subscription.status !== "active" || !subscription.latest_invoice) {
        console.log(`Skipping subscription ${subscription.id} - Status: ${subscription.status}`);
        return;
    }


    const { getUserByStripeCustomerId } = api.controllers.user;
    const { createOrUpdateSubscription } = api.controllers.subscriptions;


    const stripeCustomerId = subscription.customer as string;
    const userData = await convex.query(getUserByStripeCustomerId, { stripeCustomerId });

    if (!userData) {
        throw new Error(`User not found for stripe customer id: ${stripeCustomerId}`);
    }

    // console.log('🟩 webHook - handle subscription:-');
    // console.log(JSON.stringify(subscription, undefined, 2));

    try {

        const subscriptionInfoStoreInDB = {
            userId: userData._id,
            status: subscription.status,
            stripeSubscriptionId: subscription.id,
            planType: subscription.items.data[0].plan.interval as "month" | "year",
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
        }

        await convex.mutation(createOrUpdateSubscription, subscriptionInfoStoreInDB);

        console.log(`Successfully processed ${eventType} for subscription ${subscription.id}`);

    } catch (error) {
        console.error(`Error processing ${eventType} for subscription ${subscription.id}:`, error);
    }

}







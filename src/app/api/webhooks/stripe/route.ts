import { handleStripeWebhookEventRoute, verifyStripeWebhookSignature } from "./helper";


// stripe send us payment related information... 
// by the POST request at this endpoint by webhook...
// & we config the webhook endpoint in stripe dashboard...
export async function POST(request: Request) {

    const body = await request.text();

    const signatureValue = request.headers.get('stripe-signature') as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    try {

        // validate the webhook signature
        const stripeObject = verifyStripeWebhookSignature(body, signatureValue, webhookSecret);

        // handle the stripe all events
        await handleStripeWebhookEventRoute(stripeObject);

        // send acknowledgment to Stripe
        return new Response('Webhook received', { status: 200 });

    } catch (err) {
        const message = err instanceof Error ? err.message : err;

        console.error("🔴🔴🔴 Webhook processing failed:- ", message);
        return new Response(`Webhook Error: ${message}`, { status: 400 });
    }

}
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";


const url = process.env.NEXT_PUBLIC_APP_URL;
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


export async function POST() {

    const { userId } = auth();

    if (!userId) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { getUserByClerkId } = api.controllers.user;

    try {
        const userData = await convex.query(getUserByClerkId, { clerkId: userId });

        if (!userData || !userData.stripeCustomerId) {
            return NextResponse.json({ error: "User not found or no Stripe customer ID" }, { status: 404 });
        }

        // 🟩🟩🟩 billing portal url session create here... 
        const session = await stripe.billingPortal.sessions.create({
            customer: userData.stripeCustomerId,
            return_url: `${url}/billing`,
        });

        return NextResponse.json({ billingUrl: session.url });
    } catch (error) {
        console.error("Error creating billing portal session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
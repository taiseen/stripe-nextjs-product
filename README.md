> 24 - September - 2025

# Stripe Product

Build a stripe payment system for product

⚙️ This project was created by `bun`

```sh
bun install
```

```sh
bun dev
```

For run db locally

```sh
bunx convex dev
```

## 📦 Packages:-

- bunx create-next-app@14.2.15 .
- bunx --bun shadcn@latest init
- bun add convex
- bunx --bun shadcn@latest add button
- bunx --bun shadcn@latest add card
- bunx --bun shadcn@latest add badge
- bunx --bun shadcn@latest add skeleton
- bunx --bun shadcn@latest add sonner
- bun add stripe

### Stripe Webhook (local testing)

- run at cmd & this will generate a - `signing secret` for using this web-hook locally.
  
```js
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 📎 Reference

- [`Shadcn Components`](https://ui.shadcn.com/docs/components) 🎨
- [`Convex Dashboard`](https://dashboard.convex.dev) 🛢️
- [`Convex Doc`](https://docs.convex.dev)
- [`Clerk Dashboard`](https://dashboard.clerk.com) 🛡️
- [`Clerk Doc`](https://clerk.com/docs)
- [`Stripe Dashboard`](https://dashboard.stripe.com) 💰
- [`Upstash Dashboard`](https://console.upstash.com)

### Learning Context:-

- manually data input at convex db
  - bunx convex import --table <TABLE_NAME> <FILE_NAME.json>

### Stripe checkout webhook events:-

- When using Stripe Checkout, a single purchase triggers multiple webhook events (like table).
- As part of Stripe’s normal payment lifecycle, we typically only need to handle `checkout.session.completed` for fulfillment.

| Event Type                  | What It Means                                                                     |
|-----------------------------|-----------------------------------------------------------------------------------|
|payment_intent.created       | A PaymentIntent was created (represents the intent to collect payment).           |
|charge.succeeded             | The actual charge (money transfer) succeeded.                                     |
|payment_intent.succeeded     | The full PaymentIntent succeeded (includes charge + any other steps).             |
|`checkout.session.completed` | The customer successfully completed the Checkout session (this is the most important one for most apps).|
|charge.updated               | A minor update to the charge object (e.g., metadata, fraud details, etc.).        |

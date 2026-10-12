import { NextResponse } from "next/server";
import Stripe from "stripe";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "Stripe is not configured" }, { status: 503 });
  const { amount, orderId } = await req.json() as { amount?: number; orderId?: string };
  if (!amount || amount <= 0) return NextResponse.json({ error: "A positive amount is required" }, { status: 400 });
  const stripe = new Stripe(key);
  const intent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency: "aed", automatic_payment_methods: { enabled: true }, metadata: { orderId: orderId ?? "" } });
  return NextResponse.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id });
}

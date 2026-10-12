import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validation";
import { deliveryFee, installmentSchedule } from "@/lib/delivery";
import Stripe from "stripe";
import { createTabbySession } from "@/lib/tabby";
import { orderRequestSchema } from "@/lib/validation";
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
export const dynamic = "force-dynamic";
type CartItem = { id: string; quantity: number };

export async function POST(req: Request) {
  try {
    const body = await req.json() as { items: CartItem[] } & Record<string, unknown>;
    const parsed = orderRequestSchema.parse(body);
    const products = await prisma.product.findMany({ where: { id: { in: parsed.items.map((i) => i.id) }, stock: { gt: 0 } } });
    if (products.length !== new Set(parsed.items.map((i) => i.id)).size) throw new Error("One or more products are unavailable");
    const subtotal = products.reduce(
      (sum: number, p: (typeof products)[number]) =>
        sum + Number(p.price) * (body.items.find((i: CartItem) => i.id === p.id)?.quantity ?? 0),
      0,
    );
    const fee = deliveryFee(parsed.city, subtotal);
    const total = subtotal + fee;
    let paymentIntentId: string | undefined;
    if (parsed.paymentMethod === "STRIPE" && stripe) {
      const intent = await stripe.paymentIntents.create({ amount: Math.round(total * 100), currency: "aed", metadata: { app: "electroqist" } });
      paymentIntentId = intent.id;
    }
    if (parsed.paymentMethod === "TABBY") {
      const tabby = await createTabbySession({ amount: total });
      if (!tabby.approved) return NextResponse.json({ error: tabby.message }, { status: 503 });
    }
    const order = await prisma.order.create({
      data: {
        paymentMethod: parsed.paymentMethod, paymentIntentId, subtotal, deliveryFee: fee, total,
        city: parsed.city, address: parsed.address, phone: parsed.phone, emiratesId: parsed.emiratesId || null,
        installmentSchedule: parsed.paymentMethod === "TABBY" ? installmentSchedule(total) : undefined,
        items: { create: parsed.items.map((i) => ({ productId: i.id, quantity: i.quantity, unitPrice: products.find((p: (typeof products)[number]) => p.id === i.id)?.price ?? 0 })) },
      },
    });
    return NextResponse.json({ orderId: order.id, total, paymentIntentId });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to create order" }, { status: 400 });
  }
}

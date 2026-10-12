import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  const order = await prisma.order.findUnique({ where: { id }, include: { items: { include: { product: true } } } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  return NextResponse.json({
    id: order.id, status: order.status, paymentMethod: order.paymentMethod,
    total: order.total, city: order.city, createdAt: order.createdAt,
    items: order.items.map((item) => ({ name: item.product.name, quantity: item.quantity, unitPrice: item.unitPrice })),
  });
}

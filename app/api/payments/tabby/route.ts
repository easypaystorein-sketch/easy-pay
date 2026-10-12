import { NextResponse } from "next/server";
import { createTabbySession } from "@/lib/tabby";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json() as { amount?: number; orderId?: string };
  if (!body.amount || body.amount <= 0) return NextResponse.json({ error: "A positive amount is required" }, { status: 400 });
  const result = await createTabbySession({ amount: body.amount, orderId: body.orderId });
  return NextResponse.json(result);
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";
async function isAdmin() { return (await getServerSession(authOptions))?.user?.role === "ADMIN"; }
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const body = productSchema.parse(await req.json()); return NextResponse.json(await prisma.product.create({ data: body }), { status: 201 }); }
  catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid product" }, { status: 400 }); }
}
export async function GET() { return NextResponse.json(await prisma.product.findMany({ include: { category: true } })); }

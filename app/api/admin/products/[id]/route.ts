import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { productSchema } from "@/lib/validation";
export const dynamic = "force-dynamic";
async function isAdmin() { return (await getServerSession(authOptions))?.user?.role === "ADMIN"; }
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { return NextResponse.json(await prisma.product.update({ where: { id: params.id }, data: productSchema.partial().parse(await req.json()) })); }
  catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to update product" }, { status: 400 }); }
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { await prisma.product.delete({ where: { id: params.id } }); return NextResponse.json({ ok: true }); }
  catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to delete product" }, { status: 400 }); }
}

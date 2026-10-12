import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validation";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === "ADMIN";
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = categorySchema.partial().parse(await req.json());
    return NextResponse.json(await prisma.category.update({ where: { id: params.id }, data: body }));
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to update category" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const count = await prisma.product.count({ where: { categoryId: params.id } });
  if (count) return NextResponse.json({ error: "Move or delete products before removing this category" }, { status: 409 });
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to delete category" }, { status: 400 });
  }
}

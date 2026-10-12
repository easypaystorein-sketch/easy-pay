import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { orderStatusSchema } from "@/lib/validation";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const status = orderStatusSchema.parse((await req.json()).status);
    return NextResponse.json(await prisma.order.update({ where: { id: params.id }, data: { status } }));
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Unable to update order" }, { status: 400 });
  }
}

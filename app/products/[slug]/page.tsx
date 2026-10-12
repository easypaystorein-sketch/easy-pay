import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const p = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true } });
  if (!p) notFound();
  return <main className="detail-shell"><div className="detail-image">{p.imageUrl ? <img src={p.imageUrl} alt={p.name} onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="product-placeholder">◈</div>}</div><div className="detail-copy"><div className="eyebrow text-teal">{p.category.name}</div><h1>{p.name}</h1><p className="detail-description">{p.description}</p><p className="detail-price">AED {Number(p.price).toLocaleString("en-AE")}</p><AddToCart product={{ id: p.id, name: p.name, price: Number(p.price), imageUrl: p.imageUrl }} /><p className="mt-5 text-sm text-white/45">{p.stock > 0 ? `${p.stock} in stock · UAE delivery available` : "Currently unavailable"}</p></div></main>;
}

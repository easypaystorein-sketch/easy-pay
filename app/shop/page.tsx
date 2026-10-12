import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function Shop() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "asc" } });
  return <main className="section-shell pt-16"><div className="section-heading"><div><p className="eyebrow text-teal">THE COLLECTION</p><h1>Find your next <span>favourite.</span></h1></div><p className="max-w-xs text-sm text-white/55">October 2026 UAE catalogue · free delivery over AED 250.</p></div><div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div></main>;
}

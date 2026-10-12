import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await prisma.product.findMany({ where: { featured: true }, include: { category: true }, orderBy: { createdAt: "asc" } });
  return (
    <main>
      <Hero imageUrl={products[0]?.imageUrl} />
      <section className="section-shell">
        <div className="section-heading"><div><p className="eyebrow text-teal">THE EDIT</p><h2>Made for the way<br /><span>you move.</span></h2></div><Link href="/shop" className="text-sm font-bold text-gold transition hover:text-white">View all products ↗</Link></div>
        <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      </section>
      <section className="split-banner"><div><p className="eyebrow text-teal">PAY YOUR WAY</p><h2>Good tech.<br /><span>Better timing.</span></h2></div><p className="max-w-md text-white/65">From cards to flexible instalments, checkout is designed around your pace. Fast UAE delivery is included on every order over AED 250.</p></section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "./cart";

type Product = { id: string; name: string; slug: string; price: unknown; imageUrl?: string | null; category: { name: string } };

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.06 }} whileHover={{ y: -8 }} className="product-card group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="product-image-wrap">
          {!imageFailed && product.imageUrl ? <img src={product.imageUrl} alt={product.name} onError={() => setImageFailed(true)} /> : <div className="product-placeholder">◈</div>}
          <span className="product-quick-label">View details</span>
        </div>
        <div className="p-5">
          <div className="eyebrow">{product.category.name}</div>
          <h3 className="mt-2 min-h-12 text-lg font-semibold tracking-tight">{product.name}</h3>
          <p className="mt-3 text-lg font-bold text-gold">AED {Number(product.price).toLocaleString("en-AE")}</p>
        </div>
      </Link>
      <button onClick={() => add({ id: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl })} className="mx-5 mb-5 w-[calc(100%-2.5rem)] rounded-xl border border-gold/40 px-4 py-3 text-sm font-bold text-gold transition hover:bg-gold hover:text-navy">Quick add</button>
    </motion.article>
  );
}

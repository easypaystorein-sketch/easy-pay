"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ imageUrl }: { imageUrl?: string | null }) {
  return (
    <section className="hero-shell">
      <div className="hero-glow" />
      <div className="hero-content">
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} className="eyebrow text-teal">ELECTRONICS, ELEVATED · UAE</motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} className="hero-title">Tech that fits <span>your life.</span></motion.h1>
          <motion.p variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className="hero-copy">Curated devices, delivered across the UAE. Buy now and split your payment into four easy instalments.</motion.p>
          <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="flex flex-wrap items-center gap-4">
            <Link className="btn btn-gold hero-cta" href="/shop">Explore the collection <span>↗</span></Link>
            <span className="pay-badge">Pay in 4 <b>•</b> no hidden fees</span>
          </motion.div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.82, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }} className="hero-product">
        <div className="hero-product-ring" />
        {imageUrl ? <img src={imageUrl} alt="Featured technology" onError={(event) => { event.currentTarget.style.display = "none"; }} /> : <div className="product-placeholder">◈</div>}
        <div className="hero-floating-card"><span>01</span><strong>Chosen for<br />your next move.</strong></div>
      </motion.div>
    </section>
  );
}

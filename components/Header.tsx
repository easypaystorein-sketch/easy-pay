"use client";
import Link from "next/link";
import { useCart } from "./cart";
export default function Header() { const { count } = useCart(); return <header className="border-b border-white/10"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><Link href="/" className="text-xl font-black text-gold">ELECTRO<span className="text-white">QIST</span></Link><nav className="hidden gap-6 text-sm md:flex"><Link href="/shop">Shop</Link><Link href="/track-order">Track order</Link><Link href="/policies">Policies</Link></nav><Link className="btn btn-gold px-4 py-2 text-sm" href="/cart">Cart ({count})</Link></div></header>; }

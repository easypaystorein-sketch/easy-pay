"use client";

import Link from "next/link";
import { useCart } from "./cart";

export default function Header() {
  const { count } = useCart();
  return <header className="site-header"><div className="header-inner"><Link href="/" className="brand">ELECTRO<span>QIST</span><i> UAE</i></Link><nav><Link href="/shop">Shop</Link><Link href="/track-order">Track order</Link><Link href="/policies">Policies</Link></nav><Link className="cart-link" href="/cart">Bag <b>{count.toString().padStart(2, "0")}</b></Link></div></header>;
}

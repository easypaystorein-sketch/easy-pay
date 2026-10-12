"use client";
import { useCart } from "./cart";
export default function AddToCart({ product }: { product: { id: string; name: string; price: number; imageUrl?: string | null } }) { const { add } = useCart(); return <button className="btn btn-gold w-full" onClick={() => add(product)}>Add to cart</button>; }

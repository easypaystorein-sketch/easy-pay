export default function Loading() {
  return <main className="section-shell"><div className="skeleton skeleton-title" /><div className="product-grid mt-10">{Array.from({ length: 8 }).map((_, index) => <div className="product-card" key={index}><div className="skeleton h-[245px]" /><div className="p-5"><div className="skeleton h-3 w-20" /><div className="skeleton mt-4 h-6 w-4/5" /><div className="skeleton mt-4 h-5 w-1/3" /></div></div>)}</div></main>;
}

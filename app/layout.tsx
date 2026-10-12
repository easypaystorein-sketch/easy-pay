import "./globals.css";
import { CartProvider } from "@/components/cart";
import Header from "@/components/Header";
export const metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), title: "ElectroQist UAE | Smart tech, simply delivered", description: "Curated electronics with UAE delivery and flexible payments.", openGraph: { title: "ElectroQist UAE", description: "Smart tech, simply delivered", images: ["/og.svg"] } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><CartProvider><Header />{children}<footer className="mt-20 border-t border-white/10 px-5 py-10 text-center text-sm text-white/60">© 2026 ElectroQist UAE · Built for the UAE</footer></CartProvider></body></html>; }

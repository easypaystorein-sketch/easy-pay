import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const catalog = [
  ["Smartphones", "smartphones", "Flagship phones and everyday essentials"],
  ["Laptops", "laptops", "Work, study and creative power"],
  ["Audio", "audio", "Immersive listening for every room"],
  ["Gaming", "gaming", "Level up your setup"],
  ["Wearables & accessories", "wearables-accessories", "Small upgrades with a big impact"],
] as const;

const products = [
  {
    name: "Apple iPhone 16 Pro Max",
    slug: "apple-iphone-16-pro-max",
    price: 5099,
    category: "Smartphones",
    featured: true,
    description:
      "The ultimate iPhone experience with an aerospace-grade titanium design, a powerful A18 Pro chip and a pro camera system built for UAE days and nights. Chip: A18 Pro. Display: 6.9-inch Super Retina XDR OLED, ProMotion 120Hz. Camera: 48MP Fusion, 48MP Ultra Wide and 12MP 5x Telephoto. Battery: up to 33 hours video playback.",
    images: [
      "https://images.unsplash.com/photo-1592286927505-2fd0b7a0f4f5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    slug: "samsung-galaxy-s25-ultra",
    price: 5199,
    category: "Smartphones",
    featured: true,
    description:
      "A refined Galaxy flagship with built-in S Pen, Galaxy AI and a camera made for detail. Chip: Snapdragon 8 Elite for Galaxy. Display: 6.9-inch QHD+ Dynamic AMOLED 2X, 120Hz. Camera: 200MP wide, 50MP ultra-wide, 50MP 5x telephoto and 10MP 3x telephoto. Battery: 5,000mAh with 45W charging.",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Apple MacBook Air 15-inch M3",
    slug: "apple-macbook-air-15-m3",
    price: 5299,
    category: "Laptops",
    featured: true,
    description:
      "A spacious, silent everyday laptop that is ready for work, study and creative projects. Chip: Apple M3 with 8-core CPU and 10-core GPU. Display: 15.3-inch Liquid Retina, 500 nits. Camera: 1080p FaceTime HD. Battery: up to 18 hours.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    price: 4499,
    category: "Laptops",
    featured: true,
    description:
      "A beautifully compact Windows laptop for focused work on the move. Chip: Intel Core Ultra 7 258V. Display: 13.4-inch FHD+ InfinityEdge, 500 nits. Camera: 1080p HDR webcam. Battery: up to 26 hours.",
    images: [
      "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    price: 1299,
    category: "Audio",
    featured: false,
    description:
      "Sony's premium noise-cancelling headphones make flights, commutes and deep work feel wonderfully quiet. Chip: Integrated V1 noise-cancelling processor. Display: none. Camera: none. Battery: up to 30 hours with noise cancelling.",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Apple AirPods Pro 2",
    slug: "apple-airpods-pro-2",
    price: 949,
    category: "Audio",
    featured: false,
    description:
      "Personalised spatial audio, adaptive transparency and all-day comfort in a pocket-sized case. Chip: Apple H2. Display: none. Camera: none. Battery: up to 6 hours per charge, 30 hours with the MagSafe case.",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "PlayStation 5 Slim",
    slug: "playstation-5-slim",
    price: 2099,
    category: "Gaming",
    featured: false,
    description:
      "Big-screen gaming in a smaller, sharper package with ultra-fast loading and immersive haptics. Chip: AMD Zen 2 8-core CPU and RDNA 2 GPU. Display: up to 4K 120Hz output. Camera: none. Battery: DualSense up to 12 hours.",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Nintendo Switch OLED",
    slug: "nintendo-switch-oled",
    price: 1399,
    category: "Gaming",
    featured: false,
    description:
      "A joyful hybrid console for living-room play, handheld sessions and sharing the fun. Chip: NVIDIA Tegra custom processor. Display: 7-inch OLED, 1280×720. Camera: none. Battery: 4.5–9 hours.",
    images: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Apple Watch Series 10",
    slug: "apple-watch-series-10",
    price: 1899,
    category: "Wearables & accessories",
    featured: false,
    description:
      "The thinnest Apple Watch yet, with health insights, a brighter display and effortless iPhone integration. Chip: S10 SiP. Display: up to 46mm wide-angle OLED Retina, 2,000 nits. Camera: none. Battery: up to 18 hours, 36 in Low Power Mode.",
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Anker 737 Power Bank",
    slug: "anker-737-power-bank",
    price: 299,
    category: "Wearables & accessories",
    featured: false,
    description:
      "A high-capacity travel companion that keeps laptops, phones and tablets topped up between meetings. Chip: Smart digital power management. Display: real-time power readout. Camera: none. Battery: 24,000mAh, 140W output.",
    images: [
      "https://images.unsplash.com/photo-1609592424715-0e8b5d2a2f84?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=85",
    ],
  },
] as const;

async function main() {
  const password = await bcrypt.hash("changeme123", 12);
  await prisma.user.upsert({
    where: { email: "admin@electroqist.ae" },
    update: { password, mustChangePassword: true, role: "ADMIN" },
    create: { email: "admin@electroqist.ae", password, role: "ADMIN", mustChangePassword: true, name: "ElectroQist Admin" },
  });

  for (const [name, slug, description] of catalog) {
    await prisma.category.upsert({ where: { slug }, update: { name, description }, create: { name, slug, description } });
  }

  for (const product of products) {
    const category = await prisma.category.findFirstOrThrow({ where: { name: product.category } });
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { name: product.name, description: product.description, price: product.price, categoryId: category.id, featured: product.featured, imageUrl: product.images[0], stock: 25 },
      create: { name: product.name, slug: product.slug, description: product.description, price: product.price, categoryId: category.id, stock: 25, featured: product.featured, imageUrl: product.images[0] },
    });
  }

  await prisma.product.deleteMany({ where: { slug: { notIn: products.map((product) => product.slug) } } });
  await prisma.category.deleteMany({ where: { slug: { notIn: catalog.map(([, slug]) => slug) } } });
}

main().catch(console.error).finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
const catalog = [
  ["Smartphones", "smartphones", "Flagship phones and everyday essentials"],
  ["Laptops", "laptops", "Work, study and creative power"],
  ["Audio", "audio", "Immersive listening for every room"],
  ["Gaming", "gaming", "Level up your setup"],
  ["Smart Home", "smart-home", "Connected comfort and security"]
];
const products = [
  ["Nova X5 5G", "nova-x5-5g", "6.7-inch AMOLED smartphone with all-day battery.", 1899, "Smartphones", true],
  ["Orbit Pro 14", "orbit-pro-14", "Lightweight 14-inch laptop with 16GB RAM.", 3299, "Laptops", true],
  ["AeroBuds ANC", "aerobuds-anc", "Wireless noise-cancelling earbuds with 30-hour case.", 449, "Audio", false],
  ["Pulse Max Soundbar", "pulse-max-soundbar", "Dolby-ready soundbar for cinematic living rooms.", 799, "Audio", false],
  ["Titan RTX Gaming PC", "titan-rtx-gaming-pc", "High-performance desktop built for 1440p gaming.", 6499, "Gaming", true],
  ["Meka Wireless Controller", "meka-wireless-controller", "Low-latency controller with precision haptics.", 279, "Gaming", false],
  ["Halo 4K Monitor", "halo-4k-monitor", "27-inch 4K USB-C monitor for work and play.", 1399, "Laptops", false],
  ["NestGuard Indoor Cam", "nestguard-indoor-cam", "Privacy-first 2K camera with smart alerts.", 299, "Smart Home", false],
  ["Volt Smart Plug 4-Pack", "volt-smart-plug-4-pack", "Energy-aware Wi-Fi plugs with schedules.", 159, "Smart Home", false],
  ["ZenCharge 3-in-1", "zencharge-3-in-1", "Foldable wireless charger for your devices.", 229, "Smart Home", false]
];
async function main() {
  const password = await bcrypt.hash("changeme123", 12);
  await prisma.user.upsert({ where: { email: "admin@electroqist.ae" }, update: { password, mustChangePassword: true, role: "ADMIN" }, create: { email: "admin@electroqist.ae", password, role: "ADMIN", mustChangePassword: true, name: "ElectroQist Admin" } });
  for (const [name, slug, description] of catalog) await prisma.category.upsert({ where: { slug }, update: { name, description }, create: { name, slug, description } });
  for (const [name, slug, description, price, categoryName, featured] of products) {
    const category = await prisma.category.findFirstOrThrow({ where: { name: categoryName as string } });
    await prisma.product.upsert({ where: { slug: slug as string }, update: {}, create: { name: name as string, slug: slug as string, description: description as string, price: price as number, categoryId: category.id, stock: 25, featured: featured as boolean } });
  }
}
main().finally(() => prisma.$disconnect());

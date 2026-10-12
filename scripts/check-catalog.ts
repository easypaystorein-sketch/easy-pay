import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const [categories, products] = await Promise.all([prisma.category.count(), prisma.product.count()]);
  if (categories !== 5 || products !== 10) throw new Error(`Expected 5 categories and 10 products; found ${categories} and ${products}`);
  console.log(`Catalog OK: ${categories} categories, ${products} products`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());

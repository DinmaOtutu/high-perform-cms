import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.time("Initial Fetch (No Cache)");
    const result1 = await prisma.post.findMany();
    console.timeEnd("Initial Fetch (No Cache)");
    console.log("First result:", result1.slice(0, 5)); // Show a few results for readability

    console.time("Cached Fetch");
    const result2 = await prisma.post.findMany();
    console.timeEnd("Cached Fetch");
    console.log("Cached result:", result2.slice(0, 5));

    console.time("Repeated Fetch");
    const result3 = await prisma.post.findMany();
    console.timeEnd("Repeated Fetch");
    console.log("Repeated fetch result:", result3.slice(0, 5));
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

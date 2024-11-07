// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Creating sample users
  const user = await prisma.user.create({
    data: { name: "John Doe", email: "john.doe@example.com" },
  });

  // Creating sample categories
  const category = await prisma.category.create({
    data: { name: "Technology" },
  });

  // Creating multiple posts
  for (let i = 0; i < 1000; i++) {
    await prisma.post.create({
      data: {
        title: `Sample Post ${i + 1}`,
        content: `This is the content of post ${i + 1}`,
        authorId: user.id,
        categoryId: category.id,
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

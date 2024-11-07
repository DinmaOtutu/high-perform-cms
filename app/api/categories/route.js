import prisma from '../../../src/lib/prisma';

// POST method to create a category
export async function POST(req) {
  const data = await req.json();
  const category = await prisma.category.create({
    data: {
      name: data.name,
    },
  });
  return new Response(JSON.stringify(category), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

// GET method to retrieve all categories
export async function GET() {
  const categories = await prisma.category.findMany();
  return new Response(JSON.stringify(categories), {
    headers: { 'Content-Type': 'application/json' },
  });
}

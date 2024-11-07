import prisma from '../../../src/lib/prisma';

export async function POST(req) {
  const data = await req.json();
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

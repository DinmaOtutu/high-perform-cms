import prisma from '../../../src/lib/prisma';

// POST method to create a post
export async function POST(req) {
  const data = await req.json();
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      categoryId: data.categoryId,
    },
  });
  return new Response(JSON.stringify(post), {
    headers: { 'Content-Type': 'application/json' },
    status: 201,
  });
}

// GET method to retrieve all posts with caching
export async function GET(req) {

  const posts = await prisma.post.findMany({
    take: 10,
    select: {
      id: true,
      title: true,
      content: true,
      author: { select: { name: true } }, 
      category: { select: { name: true } }
    },
    cacheStrategy: { ttl: 3600 },
  });

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// uncomment and use this for prisma optimize instead
// export async function GET(req) {
  //const posts = await prisma.post.findMany({ take: 10, select: { id: true, title: true } , cacheStrategy: { ttl: 3600 },})
  //return new Response(JSON.stringify(posts), {
 //   headers: { 'Content-Type': 'application/json' },
 // });
//}



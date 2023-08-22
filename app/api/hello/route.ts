import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type Data = {
  name: string;
};

export const GET = async (response) => {
  //fetch
  // try {
  //   await connect();
  //   const posts = await Post.find();
  //   return new NextResponse(JSON.stringify(posts), { status: 200 });

  // } catch (error) {
  //   return new NextResponse("Database Error", { status: 500 });
  // }
  return new NextResponse(JSON.stringify({ name: 'John Doe' }), {
    status: 200,
  })
};
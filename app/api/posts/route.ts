// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/libs/mongodb';
import Post from '@/app/models/post';

// Connect to the database
async function connectToDatabase() {
  await dbConnect();
}

export async function GET() {
  await connectToDatabase();
  try {
    const posts = await Post.find({});
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const post = await Post.create(body);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

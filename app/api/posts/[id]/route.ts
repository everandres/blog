// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/libs/mongodb';
import Post from '@/app/models/post';

async function connectToDatabase() {
    await dbConnect();
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDatabase();
    const { id } = params;

    try {
        await Post.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    try {
        const post = await Post.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ success: true, data: post });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectToDatabase();
    const { id } = params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

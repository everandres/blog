'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useEffect } from 'react';

const PostForm = dynamic(() => import('@/app/components/postform'), { ssr: false });

export default function CreatePostPage() {
  const router = useRouter();
  const { mutate } = useSWR('/api/posts');

  const createPost = async (data: { title: string; content: string }) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      mutate();  // Revalidate the data
      router.push('/');
    }
  };

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      // Client-side specific code
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Create Post</h2>
      <PostForm onSubmit={createPost} />
    </div>
  );
}

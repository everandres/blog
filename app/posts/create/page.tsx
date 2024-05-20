'use client';

import { useRouter } from 'next/navigation';
import PostForm from '@/app/components/postform';
import useSWR from 'swr';

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
      mutate();  // Revalidar los datos
      router.push('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Create Post</h2>
      <PostForm onSubmit={createPost} />
    </div>
  );
}

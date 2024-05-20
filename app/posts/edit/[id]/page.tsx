'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import PostForm from '@/app/components/postform';
import { IPost } from '@/app/models/post';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data, error, mutate } = useSWR(`/api/posts/${id}`, fetcher);
  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    if (data) {
      setPost(data.success ? data.data : null);
    }
  }, [data]);

  const updatePost = async (data: { title: string; content: string }) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      await mutate(); // Invalida el caché de SWR para obtener datos frescos
      router.push(`/posts/${id}`);
    }
  };

  if (error) return <div>Failed to load post</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Edit Post</h2>
      <PostForm initialData={{ title: post.title, content: post.content }} onSubmit={updatePost} />
    </div>
  );
}

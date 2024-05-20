'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { IPost } from '@/app/models/post';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface PostPageProps {
  params: { id: string };
}

export default function PostPage({ params }: PostPageProps) {
  const { data, error, mutate } = useSWR(`/api/posts/${params.id}`, fetcher);
  const router = useRouter();

  useEffect(() => {
    // Function to update the post after editing
    const handleUpdate = async () => {
      await mutate();
    };

    // Simulate a subscription to listen for changes (e.g., WebSocket, API call)
    const eventSource = new EventSource('/api/posts');
    eventSource.onmessage = (event) => {
      if (event.data === params.id) {
        handleUpdate();
      }
    };

    return () => {
      eventSource.close();
    };
  }, [params.id, mutate]);

  if (error) return <div>Failed to load post</div>;
  if (!data) return <div>Loading...</div>;

  const post: IPost = data.success ? data.data : null;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">{post.title}</h2>
      <div className="text-lg text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <p className="text-gray-500 text-sm text-center mb-2">
        {new Date(post.createdAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  );
}

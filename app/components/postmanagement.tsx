'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IPost } from '@/app/models/post';
import React, { Key, useState } from 'react';
import ConfirmModal from '@/app/components/confirmmodel'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostManagement: React.FC = () => {
  const { data, error, mutate } = useSWR('/api/posts', fetcher);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);

  if (error) return <div className="text-center text-red-500">Failed to load posts</div>;
  if (!data) return <div className="text-center">Loading...</div>;

  let posts: IPost[] = data.success ? data.data : [];

  // Ordenar los posts por fecha de creación, de más reciente a más antigua
  posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDelete = (id: string) => {
    setPostIdToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postIdToDelete) return;

    const res = await fetch(`/api/posts/${postIdToDelete}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      mutate(); // Actualiza la lista de posts
      setIsModalOpen(false);
      setPostIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPostIdToDelete(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">Manage Posts</h2>
      <ul className="space-y-4 list-none p-0">
        {posts.map((post: IPost) => (
          <li key={post._id as Key} className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  {new Date(post.createdAt).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div className="flex space-x-4">
                <Link href={`/posts/edit/${post._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(post._id as string)} // Cast post._id to string
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this post?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default PostManagement;

'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { IPost } from '@/app/models/post';
import parse from 'html-react-parser';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PostList: React.FC = () => {
  const { data, error } = useSWR('/api/posts', fetcher);

  if (error) return <div className="text-center text-red-500">Failed to load posts</div>;
  if (!data) return <div className="text-center">Loading...</div>;

  // Verifica si la estructura de la respuesta es correcta y que posts no es undefined
  let posts: IPost[] = data.success ? data.data : [];

  // Ordenar los posts por fecha de creación, de más reciente a más antigua
  posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4">
      <ul className="space-y-6 list-none p-0">
        {posts.map((post: IPost) => (
          <li key={String(post._id)} className="w-full max-w-xl">
            <Link href={`/posts/${post._id}`} className="block bg-white shadow-sm rounded-lg p-6 w-full hover:border-b-2 hover:border-black">
              <div className="text-2xl font-bold mb-2 text-center">{post.title}</div>
              <div className="text-gray-500 text-sm text-center mb-4">
                {new Date(post.createdAt).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}{' '}
                {new Date(post.createdAt).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="text-gray-700 mb-4 line-clamp-3">
                {parse(post.content)}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

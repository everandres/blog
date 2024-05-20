"use client";
import React, { Key } from 'react';
import Link from 'next/link';
import { IPost } from '@/app/models/post';

interface SidebarProps {
  posts: IPost[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, isOpen, toggleSidebar }) => {
  return (

    // ...

        <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={toggleSidebar} className="p-4 focus:outline-none">
                Close
            </button>
            <ul className="p-4 space-y-4">
                {posts.map((post) => (
                    <li key={post._id as Key}>
                        <Link href={`/posts/${post._id}`} className="text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
  );
};

export default Sidebar;

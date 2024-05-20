import React from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="w-full bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <button onClick={toggleSidebar} className="text-blue-500 p-2 focus:outline-none">
        <FiMenu size={24} />
      </button>
      <nav className="space-x-4">
        <Link href="/" className="text-blue-500 hover:underline">Home</Link>
        <Link href="/create-post" className="text-blue-500 hover:underline">Create Post</Link>
      </nav>
    </header>
  );
};

export default Header;

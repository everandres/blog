import "./globals.css";
import { ReactNode } from 'react';
import { EB_Garamond } from 'next/font/google';
import Link from 'next/link';

export const metadata = {
  title: 'Zeremias',
  description: 'A personal blog',
};

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'], // Puedes ajustar los pesos según tus necesidades
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={ebGaramond.className}>
      <head>
        <link rel="icon" href="/icon.ico" />
        </head>
      <body className="flex flex-col min-h-screen">
        <header className="bg-white-50 p-4 border-b-2 border-black">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-5xl font-bold text-black hover:underline ml-2">Zeremias</Link>
            <nav className="space-x-4">
              {/* <Link href="/" className="text-blue-500 hover:underline">Home</Link>
              <Link href="/posts/create" className="text-blue-500 hover:underline">Create Post</Link>
              <Link href="/posts/manage" className="text-blue-500 hover:underline">Manage Posts</Link> */}
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4 flex-grow">{children}</main>
        <footer className="bg-gray-100 p-4 mt-auto">
          <div className="container mx-auto text-center">
            <p>© 2024 Zeremias</p>
            <p>
              Contact: <a href="mailto:andressalmercado@gmail.com" className="text-blue-500 hover:underline">andressalmercado@gmail.com</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

'use client';

import { useState } from 'react';
import RichTextEditor from '@/app/components/richtext';

interface PostFormProps {
  initialData?: { title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <RichTextEditor initialContent={content} onContentChange={setContent} />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit</button>
    </form>
  );
};

export default PostForm;

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dinamicamente importar CKEditor para que solo se cargue en el cliente
import { ComponentType } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
    initialContent?: string;
    onContentChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, onContentChange }) => {
  const [content, setContent] = useState(initialContent || '');

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    setContent(data);
    onContentChange(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={handleChange}
      config={{
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
      }}
    />
  );
};

export default RichTextEditor;

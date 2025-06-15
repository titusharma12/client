'use client';

import React, { useRef, useState, useEffect } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

function debounce(fn: () => void, delay: number) {
  let timeout: any;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

export default function EmailEditorPage() {
  const emailEditorRef = useRef<EditorRef>(null);
  const [heading, setHeading] = useState('🔥 Mega Sale Alert!');
  const [selectedTemplate, setSelectedTemplate] = useState<'t1' | 't2'>('t1');

  const templates = {
    t1: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: 'text',
                    values: {
                      text: `<h1 style="text-align:center;">${heading}</h1><p style="text-align:center;">Limited Time Offer on All Products</p>`,
                      textAlign: 'center',
                    },
                  },
                  {
                    type: 'image',
                    values: {
                      src: {url:'https://images.unsplash.com/photo-1726137569962-456daf4ec02f?q=80&w=2070&auto=format&fit=crop',width :'300px',height:'200px'},
                      altText: 'Sale Banner',
                     
                     
                    },
                  },
                  {
                    type: 'button',
                    values: {
                      text: 'Shop Now',
                      href: 'https://yourstore.com',
                      backgroundColor: '#FF5722',
                      color: '#ffffff',
                      align: 'center',
                      borderRadius: '4px',
                      padding: '10px',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    t2: {
      body: {
        rows: [
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: 'text',
                    values: {
                      text: `<h1 style="text-align:center;">${heading}</h1><p style="text-align:center;">Check out our latest collection curated just for you.</p>`,
                      textAlign: 'center',
                    },
                  },
                  {
                    type: 'image',
                    values: {
                      src: {url:'https://images.unsplash.com/photo-1726137569962-456daf4ec02f?q=80&w=2070&auto=format&fit=crop',width :'300px',height:'200px'},
                      altText: 'Sale Banner',
                     
                     
                    },
                  },
                ],
              },
            ],
          },
          {
            cells: [2],
            columns: [
              {
                contents: [
                  {
                    type: 'text',
                    values: {
                      text: '<h3>✨ Stylish Designs</h3><p>Find the trendiest looks of the season.</p>',
                    },
                  },
                   {
                    type: 'text',
                    values: {
                      text: '<h3>🛍️ Exclusive Deals</h3><p>Save big on top picks and limited editions.</p>',
                    },
                  },
                ],
              },
             
            ],
          },
          {
            cells: [1],
            columns: [
              {
                contents: [
                  {
                    type: 'button',
                    values: {
                      text: 'Explore Now',
                      href: 'https://yourstore.com/new',
                      backgroundColor: '#1E90FF',
                      color: '#ffffff',
                      align: 'center',
                      borderRadius: '6px',
                      padding: '14px',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };

  const loadTemplate = () => {
    const editor = emailEditorRef.current?.editor;
    if (!editor) return;

    const template:any = templates[selectedTemplate];
    console.log('Loading template:', selectedTemplate);
    editor.loadDesign(template);
  };

  const syncState = debounce(() => {
    const editor = emailEditorRef.current?.editor;
    if (!editor) return;

    editor.exportHtml(({ html }) => {
      const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const newHeading = match?.[1] || heading;
      if (newHeading !== heading) {
        setHeading(newHeading);
      }
    });
  }, 800);

  const onReady: EmailEditorProps['onReady'] = (editor) => {
    loadTemplate();
    editor.addEventListener('design:updated', syncState);
  };

  useEffect(() => {
    loadTemplate();
  }, [selectedTemplate]);

  const exportHtml = () => {
    const editor = emailEditorRef.current?.editor;
    if (!editor) return;

    editor.exportHtml(({ html }) => {
      console.log('Exported HTML:', html);
    });
  };

  return (
    <div className="w-full h-full bg-[#1d293b] grid grid-cols-12 gap-4">
      <div className='col-span-4 bg-gray-100 p-4 overflow-y-auto'>
        <h3 className='text-black text-2xl underline text-center font-bold'>Choose Email Template Layout</h3>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'
            >
              <h4 className='text-lg font-semibold'>Template {i % 2 === 0 ? 1 : 2}</h4>
              <p className='text-gray-600'>{i % 2 === 0 ? 'Modern and clean design' : 'Bold and vibrant design'}</p>
              <button
                onClick={() => setSelectedTemplate(i % 2 === 0 ? 't1' : 't2')}
                className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='col-span-8 h-full flex flex-col min-h-0 bg-white p-4'>
        <div className="flex gap-4 items-center mb-4">
          <select
            className='border px-3 py-2 rounded'
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value as 't1' | 't2')}
          >
            <option value="t1">Template 1</option>
            <option value="t2">Template 2</option>
          </select>
          <button
            className='bg-green-600 text-white px-4 py-2 rounded'
            onClick={exportHtml}
          >
            Export HTML
          </button>
          <span className='text-sm'>Heading: <strong>{heading}</strong></span>
        </div>
        <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </div>
    </div>
  );
}
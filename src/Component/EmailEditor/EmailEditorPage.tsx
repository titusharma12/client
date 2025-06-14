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

  // Define two templates that consume "heading"
  const templates = {
    t1: ` <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f4; padding:20px 0;">
      <tr>
        <td align="center">
          <!-- Container -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:5px; overflow:hidden;">
            <!-- Content -->
            <tr>
              <td style="padding:20px; text-align:center;">
                <h1 style="color:#e63946; font-size:24px; margin:0 0 10px 0;">${heading}</h1>
                <p style="margin:0 0 20px 0; font-size:16px; color:#333333;">Don’t miss out!</p>
                <a href="#" style="background-color:#e63946; color:#ffffff; text-decoration:none; padding:12px 24px; display:inline-block; border-radius:4px; font-size:16px;">Buy Now</a>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="padding:20px; background-color:#f1f1f1; color:#888888; font-size:12px;">
                <p style="margin:0;">&copy; 2025 Your Company. All rights reserved.</p>
                <p style="margin:5px 0 0 0;">1234 Market St, Suite 500, Your City, Country</p>
                <p style="margin:5px 0 0 0;">
                  <a href="#" style="color:#888888; text-decoration:underline;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
          <!-- End Container -->
        </td>
      </tr>
    </table>
  </body>`,
    t2: `<div style="background:#111;color:white;padding:20px;border-radius:8px;">
           <h1>${heading}</h1>
           <p>Exclusive offer inside</p>
           <a href="#" style="background:#ff9f1c;color:black;padding:10px;display:inline-block;">Claim Offer</a>
         </div>`,
  };

  const loadTemplate = () => {
    const editor = emailEditorRef.current?.editor;
    if (!editor) return;

    const html = templates[selectedTemplate];
    const designJson:any = { body: { rows: [{ cells: [1], columns: [{ contents: [{ type: 'text', values: { text: html } }], values: {} }], values: {} }], values: {} } };
    console.log('Loading design for', selectedTemplate, 'with heading:', heading);
    editor.loadDesign(designJson);
  };

  // Debounced sync function
  const syncState = debounce(() => {
    const editor = emailEditorRef.current?.editor;
    if (!editor) return;

    editor.exportHtml(({ html }) => {
      const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
      const newHeading = match?.[1] || heading;
      if (newHeading !== heading) {
        console.log('Syncing heading to state:', newHeading);
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
  }, [selectedTemplate, heading]);

  const exportHtml = () => {
     const editor = emailEditorRef.current?.editor;
    if (!editor) return;

    editor.exportHtml(({ html }) => {
      console.log('Exported HTML:', html);
    });
  };

  return (
    <div className="w-full h-full *min-h-0 bg-[#1d293b] grid grid-cols-12 gap-4">
      <div className='w-full h-full flex flex-col min-h-0 col-span-4 bg-gray-100 p-4'>
        <h3 className='text-black text-2xl underline text-center font-bold'>Choose Email Template Layout</h3>
        <div className='w-full h-full mt-4 *min-h-0 grid grid-cols-2 gap-4 overflow-y-auto'>
        {/* card type layout structure  */}
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 1</h4>
            <p className='text-gray-600'>Modern and clean design</p>
            <button onClick={() => setSelectedTemplate('t1')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
          <div className='bg-white p-4 h-40 rounded shadow hover:shadow-lg transition-shadow duration-200'>
            <h4 className='text-lg font-semibold'>Template 2</h4>
            <p className='text-gray-600'>Bold and vibrant design</p>
            <button onClick={() => setSelectedTemplate('t2')} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Select</button>
          </div>
        </div>
      </div>
      <div className='w-full h-full min-h-0 flex flex-col col-span-8 bg-white p-4'>

      <div className="flex gap-2 mb-4">
        <select value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value as any)}>
          <option value="t1">Template 1</option>
          <option value="t2">Template 2</option>
        </select>
        <button onClick={exportHtml}>Export HTML</button>
        <span>Heading state: <strong>{heading}</strong></span>
      </div>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
      </div>
    </div>
  );
}

// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const EmailEditorPage = dynamic(() => import('../Component/EmailEditor/EmailEditorPage'), {
  ssr: false,
});

export default function Page() {
  return <EmailEditorPage />;
}

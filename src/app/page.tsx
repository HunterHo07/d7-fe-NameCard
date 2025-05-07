'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with no SSR to avoid document is not defined errors
const HomePage = dynamic(() => import('../components/HomePage'), { ssr: false });

export default function Home() {
  return <HomePage />;
}

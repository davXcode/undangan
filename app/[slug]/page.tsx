'use client';

export const dynamic = 'force-static';

import { useEffect, useRef, useState } from 'react';
import ScreenStart from '../components/ScreenStart';
import MainContent from '../components/MainContent';

type ParamsProps = {
  params: { slug: string };
};

export default function Home({ params: { slug } }: ParamsProps) {
  const [showContent, setShowContent] = useState(false);
  const [name, setName] = useState<string>('');
  const weddingAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('slug:', slug);
    if (slug.startsWith('to%3A')) {
      const extractedName = decodeURIComponent(slug.slice(5)).replace(
        /%20/g,
        ' ',
      );
      setName(extractedName);
    }
  }, [slug]);

  const handleStarted = () => {
    weddingAudioRef.current
      ?.play()
      .then(() => {
        weddingAudioRef.current?.pause();
        if (weddingAudioRef.current) weddingAudioRef.current.currentTime = 0;
      })
      .catch(() => {});
    setTimeout(() => setShowContent(true), 7000);
  };

  const handleMusicStart = () => {
    weddingAudioRef.current?.play().catch(() => {});
  };

  return (
    <div className="h-screen">
      <audio ref={weddingAudioRef} src="/music/wedding.mp3" preload="auto" />
      <ScreenStart onMusicStart={handleMusicStart} onStarted={handleStarted} />
      {showContent && <MainContent name={name} />}
    </div>
  );
}

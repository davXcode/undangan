'use client';

import { useRef, useState } from 'react';
import ScreenStart from './components/ScreenStart';
import MainContent from './components/MainContent';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const weddingAudioRef = useRef<HTMLAudioElement>(null);

  const handleStarted = () => {
    // Unlock audio in the user gesture context so iOS allows programmatic play later
    weddingAudioRef.current
      ?.play()
      .then(() => {
        weddingAudioRef.current?.pause();
        if (weddingAudioRef.current) weddingAudioRef.current.currentTime = 0;
      })
      .catch(() => {});
    setTimeout(() => weddingAudioRef.current?.play().catch(() => {}), 6000);
    setTimeout(() => setShowContent(true), 7000);
  };

  return (
    <div className="h-screen">
      <audio ref={weddingAudioRef} src="/music/wedding.mp3" preload="auto" />
      <ScreenStart onStarted={handleStarted} />
      {showContent && <MainContent />}
    </div>
  );
}

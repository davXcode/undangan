'use client';

import { useState } from 'react';
import ScreenStart from './components/ScreenStart';
import MainContent from './components/MainContent';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  const handleStarted = () => {
    setTimeout(() => setShowContent(true), 7000);
  };

  return (
    <div className="h-screen">
      <ScreenStart
        onMusicStart={() => setAutoPlayMusic(true)}
        onStarted={handleStarted}
      />
      {showContent && <MainContent autoPlayMusic={autoPlayMusic} />}
    </div>
  );
}

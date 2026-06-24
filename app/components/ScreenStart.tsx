'use client';

import { config } from '@/lib/config';
import { useEffect, useRef, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

type ScreenStartProps = {
  onMusicStart?: () => void;
  onStarted?: () => void;
};

const ScreenStart = ({ onMusicStart, onStarted }: ScreenStartProps) => {
  const [showScreenStart, setShowScreenStart] = useState(true);
  const [started, setStarted] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const keyboardRef = useRef<HTMLAudioElement>(null);
  const shouldPlayRef = useRef(false);

  const tryPlay = () => {
    if (shouldPlayRef.current) {
      keyboardRef.current?.play().catch(() => {});
    }
  };

  const stopKeyboard = () => {
    shouldPlayRef.current = false;
    if (keyboardRef.current) {
      keyboardRef.current.pause();
      keyboardRef.current.currentTime = 0;
    }
  };

  // Called directly from a user gesture — audio unlock is guaranteed
  const handleStart = () => {
    if (started) return;
    // Start playing synchronously in gesture context — browser allows this on all platforms
    shouldPlayRef.current = true;
    keyboardRef.current?.play().catch(() => {});
    setStarted(true);
    onStarted?.();
  };

  useEffect(() => {
    if (!started) return;

    const showVideoTimer = setTimeout(() => {
      setVideoVisible(true);
      setTimeout(() => setVideoOpacity(true), 50);
    }, 5500);

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
      if (keyboardRef.current) {
        keyboardRef.current.pause();
        keyboardRef.current.currentTime = 0;
      }
    }, 13000);

    const removeTimer = setTimeout(() => {
      setShowScreenStart(false);
    }, 14200);

    return () => {
      clearTimeout(showVideoTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [started]);

  if (!showScreenStart) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[1200ms] ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Cover dengan blackout overlay */}
      <div className="absolute inset-0">
        <img
          src="/cover.jpg"
          alt="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Tap to start — tampil sebelum animasi dimulai */}
      {!started && (
        <button
          onClick={handleStart}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer"
        >
          <span className="text-white font-legan text-sm animate-pulse">
            Tap to Open
          </span>
        </button>
      )}

      {/* Teks typing — hanya muncul setelah tap */}
      {started && (
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-white">
          <TypeAnimation
            sequence={[
              () => {
                shouldPlayRef.current = true;
                tryPlay();
              },
              'THE WEDDING OF',
              () => {
                stopKeyboard();
              },
              2000,
              () => {
                shouldPlayRef.current = true;
                tryPlay();
              },
              config.coupleNames.toUpperCase(),
              () => {
                stopKeyboard();
                onMusicStart?.();
              },
            ]}
            wrapper="span"
            speed={20}
            style={{ fontSize: '2em', display: 'inline-block' }}
            className="font-legan text-sm"
            repeat={0}
          />
        </div>
      )}

      <audio ref={keyboardRef} src="/music/keyboard.mp3" loop preload="auto" />

      {/* Video cinematic fade in */}
      {videoVisible && (
        <div
          className={`absolute inset-0 z-20 transition-opacity duration-[2500ms] ${
            videoOpacity ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/video-loop.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default ScreenStart;

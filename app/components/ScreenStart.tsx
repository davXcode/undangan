"use client";

import { config } from "@/lib/config";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

type ScreenStartProps = {
  onMusicStart?: () => void;
};

const ScreenStart = ({ onMusicStart }: ScreenStartProps) => {
  const [showScreenStart, setShowScreenStart] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const keyboardRef = useRef<HTMLAudioElement>(null);
  const unlockedRef = useRef(false);
  const shouldPlayRef = useRef(false);

  const tryPlay = () => {
    if (unlockedRef.current && shouldPlayRef.current) {
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

  const unlockAudio = () => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    tryPlay();
  };

  useEffect(() => {
    document.addEventListener("click", unlockAudio, { once: true });
    document.addEventListener("touchstart", unlockAudio, { once: true });
    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  useEffect(() => {
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
  }, []);

  if (!showScreenStart) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[1200ms] ${
        fadeOut ? "opacity-0" : "opacity-100"
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

      {/* Teks typing di tengah */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-white">
        <TypeAnimation
          sequence={[
            () => { shouldPlayRef.current = true; tryPlay(); },
            "THE WEDDING OF",
            () => { stopKeyboard(); },
            2000,
            () => { shouldPlayRef.current = true; tryPlay(); },
            config.coupleNames.toUpperCase(),
            () => { stopKeyboard(); onMusicStart?.(); },
          ]}
          wrapper="span"
          speed={20}
          style={{ fontSize: "2em", display: "inline-block" }}
          className="font-legan text-sm"
          repeat={0}
        />
      </div>
      <audio ref={keyboardRef} src="/music/keyboard.mp3" loop preload="auto" />

      {/* Video cinematic fade in */}
      {videoVisible && (
        <div
          className={`absolute inset-0 z-20 transition-opacity duration-[2500ms] ${
            videoOpacity ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Letterbox cinematic bars */}
          {/* <div className="absolute top-0 left-0 right-0 h-[10vh] bg-black z-30" />
          <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-30" /> */}
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

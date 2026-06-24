"use client";

import { useEffect, useState } from "react";
import ScreenStart from "../components/ScreenStart";
import MainContent from "../components/MainContent";

type ParamsProps = {
  params: { slug: string };
};

export default function Home({ params: { slug } }: ParamsProps) {
  const [showContent, setShowContent] = useState(false);
  const [name, setName] = useState<string>("");
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  useEffect(() => {
    console.log('slug:', slug);
    if (slug.startsWith("to%3A")) {
      const extractedName = decodeURIComponent(slug.slice(5)).replace(
        /%20/g,
        " "
      );
      setName(extractedName);
    }

    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 7000);

    return () => clearTimeout(contentTimer);
  }, [slug]);

  return (
    <div className="h-screen">
      <ScreenStart onMusicStart={() => setAutoPlayMusic(true)} />
      {showContent && <MainContent name={name} autoPlayMusic={autoPlayMusic} />}
    </div>
  );
}

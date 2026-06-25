'use client';

import { useState, useEffect, useRef } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import CountdownTimer from './Countdown';
import Form from './Form';
import WishesList from './WishesList';
import { config } from '@/lib/config';

type WeddingScreenProps = {
  name?: string;
};

const WeddingScreen = ({ name }: WeddingScreenProps) => {
  const [fadeClass, setFadeClass] = useState('opacity-0');
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Untuk fade-in pertama kali
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeClass('opacity-100');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const { ref: mainRef, inView: isMainInView } = useInView({
    threshold: 0.5,
  });

  const { ref: main2Ref, inView: isMain2InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide1Ref, inView: isSlide1InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide2Ref, inView: isSlide2InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide3Ref, inView: isSlide3InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide4Ref, inView: isSlide4InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide5Ref, inView: isSlide5InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide6Ref, inView: isSlide6InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide7Ref, inView: isSlide7InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide8Ref, inView: isSlide8InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide9Ref, inView: isSlide9InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide10Ref, inView: isSlide10InView } = useInView({
    threshold: 0.5,
  });
  const { ref: endRef, inView: isEndInView } = useInView({
    threshold: 0.5,
  });

  const { ref: slideVideoRef, inView: isSlideVideoInView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const video = document.querySelector('iframe');
    if (video) {
      if (isSlide8InView) {
        video.src += '&autoplay=1';
      } else {
        video.src = video.src.replace('&autoplay=1', '');
      }
    }
  }, [isSlide8InView]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isSlideVideoInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isSlideVideoInView]);

  const downloadCalendar = () => {
    const startDate = new Date(config.eventDate);

    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Wedding Event Intan & Fikri
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(new Date(startDate.getTime() + 3 * 60 * 60 * 1000))}
DESCRIPTION:We look forward to celebrating with you.
LOCATION:
END:VEVENT
END:VCALENDAR
`;

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'save-the-date.ics';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`h-screen w-screen flex flex-col md:flex-row ${fadeClass} transition-opacity duration-1000`}
    >
      {/* Gambar sisi kiri Wide Untuk Komputer */}
      <div
        className="md:flex justify-center hidden items-end pb-12 w-2/3 h-1/2 md:h-full"
        style={{
          backgroundImage: `url(/foto_1_samping.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bottom-10 left-20 font-ovo text-lg text-white tracking-[5px] uppercase">
          {config.coupleNames}
        </div>
      </div>

      {/* Konten teks sisi kanan bisa scroll untuk pc */}
      <div className="md:w-1/3 h-full relative">
        {/* Single continuous background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2500ms] ${fadeClass}`}
          src="/video-loop.mp4"
        />
        <div className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative z-10">
          <div
            id="backgroundWedding"
            className="snap-start w-full h-screen flex items-center justify-center relative overflow-hidden"
          >
            {/* Video background khusus welcome */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-10"
              style={{ objectPosition: '47% center' }}
              src="/video-open.mp4"
            />
            {/* Dark overlay 40% */}
            <div className="absolute inset-0 bg-black/40 z-20" />

            <div className="relative z-30 text-center p-5 flex flex-col h-full justify-center items-center">
              <div className="gap-y-4 md:gap-y-6 flex flex-col items-center mt-16">
                <h5
                  className={`text-lg font-legan text-white uppercase tracking-widest fadeMain2 ${
                    isMain2InView ? 'active' : ''
                  } `}
                  ref={main2Ref}
                >
                  The Wedding Of
                </h5>
                <h1
                  className={`text-4xl md:text-5xl font-ovo text-white uppercase fadeMain ${
                    isMainInView ? 'active' : ''
                  } `}
                  ref={mainRef}
                >
                  {config.coupleNames}
                </h1>
                <h5
                  className={`text-lg font-legan text-white uppercase tracking-wide fadeMain2 ${
                    isMain2InView ? 'active' : ''
                  } `}
                  ref={main2Ref}
                >
                  {new Date(config.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h5>
              </div>
              <div className="absolute bottom-16 left-0 right-0 text-center">
                <p className="text-xl uppercase font-xs tracking-widest text-white">
                  {name ? `Dear ${name},` : 'Welcome'}
                </p>
                {!isOpen ? (
                  <button
                    className="animate-bounce mt-5 px-5 py-1 uppercase text-xs border border-white hover:text-white hover:bg-transparent rounded-full bg-white text-black transition"
                    onClick={handleOpen}
                  >
                    Open Invitation
                  </button>
                ) : (
                  <IoIosArrowUp
                    stroke="4"
                    className="mx-auto mt-20 animate-upDown text-white"
                  />
                )}
              </div>
            </div>
          </div>
          {isOpen && (
            <>
              {/* Slide 1 */}
              <div
                className={`text-white h-screen snap-start relative overflow-hidden`}
              >
                {/* Dark overlay - ganti nilai opacity sesuai selera, misal bg-black/40, bg-black/60, dll */}
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Photo (dinonaktifkan - uncomment kalau mau aktifkan lagi)
              <div className="absolute inset-5 z-10">
                <img
                  src="/slide_1.jpg"
                  alt="Wedding photo"
                  className="w-full h-full object-cover"
                />
              </div>
              */}
                {/* Text content */}
                <div
                  ref={slide1Ref}
                  className={`absolute bottom-12 left-8 right-8 z-20 ${isSlide1InView ? 'active' : ''} fadeInMove`}
                >
                  <h1 className="text-2xl md:text-2xl font-ovo tracking-wide text-white uppercase">
                    {config.bibleVerse}
                  </h1>
                  <p className="text-sm mt-5 font-legan">
                    {config.bibleVerseContent}
                  </p>
                  <p className="text-6xl mt-5 font-wonder">
                    {config.coupleNames}
                  </p>
                </div>
              </div>
              {/* Slide 2 */}
              <div className="snap-start text-white h-screen flex items-end pb-16 px-12 relative overflow-hidden">
                {/* Photo centered with inset on all sides */}
                <div className="absolute inset-x-5 inset-y-[20%] z-10">
                  <img
                    src="/slide_2.jpg"
                    alt="Wedding photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text content on the right side */}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-20" />
                <div
                  ref={slide2Ref}
                  className={`relative z-30 text-right ml-auto bg-black/10 rounded-xl p-5 ${isSlide2InView ? 'active' : ''} fadeInMove`}
                >
                  <p className="font-legan text-lg my-2">The Groom</p>
                  <h1 className="text-3xl md:text-5xl text-white font-ovo">
                    {config.groom}
                  </h1>
                  <p className="text-lg mt-5 font-legan text-[#CCCCCC]">
                    {config.groomBio}
                  </p>
                  {/* <Link
                    href={`https://www.instagram.com/${config.groomInstagram}`}
                    target="_blank"
                    className="cursor-pointer hover:bg-black text-sm rounded-full flex items-center justify-end gap-x-2 text-center font-legan mt-5 bg-[#4E4E4E] w-fit px-4 py-2 text-[#CCCCCC] ml-auto"
                  >
                    <FaInstagram /> {config.groomInstagram}
                  </Link> */}
                </div>
              </div>
              {/* Slide 3 */}
              <div className="snap-start text-white h-screen flex items-end pb-16 px-12 relative overflow-hidden">
                {/* Photo with inset on all sides */}
                <div className="absolute inset-x-5 inset-y-[20%] z-10">
                  <img
                    src="/slide_3.jpg"
                    alt="Wedding photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-20" />
                <div
                  ref={slide3Ref}
                  className={`relative z-30 fadeInMove bg-black/10 rounded-xl p-5 ${isSlide3InView ? 'active' : ''}  `}
                >
                  <p className="font-legan text-lg my-2">The Bride</p>
                  <h1 className="text-3xl md:text-5xl text-white  font-ovo">
                    {config.bride}
                  </h1>
                  <p className="text-lg mt-5 font-legan text-[#CCCCCC]">
                    {config.brideBio}
                  </p>
                  {/* <Link
                    href={`https://www.instagram.com/${config.brideInstagram}`}
                    target="_blank"
                    className="cursor-pointer hover:bg-black text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-5 bg-[#4E4E4E] w-fit px-4 py-2 text-[#CCCCCC]"
                  >
                    <FaInstagram /> {config.brideInstagram}
                  </Link> */}
                </div>
              </div>

              {/* Slide 5 */}
              <div className="snap-start text-white h-screen relative overflow-hidden">
                {/* Photo with inset on all sides */}
                <div className="absolute inset-5 z-10">
                  <img
                    src="/slide_5.jpg"
                    alt="Wedding photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-20" />
                {/* Top content - save our date */}
                <div
                  ref={slide5Ref}
                  className={`absolute top-0 left-0 right-0 z-30 flex items-center flex-col pt-32 ${
                    isSlide5InView ? 'active' : ''
                  } fadeInMove`}
                >
                  <h3 className="uppercase font-legan text-2xl tracking-wide mt-5 mb-2">
                    save our date
                  </h3>
                  <button
                    onClick={downloadCalendar}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <h3 className="uppercase font-ovo text-3xl text-center mt-2">
                      Walimatul `Ursy
                    </h3>
                    <h3 className="uppercase font-legan text-4xl text-center mb-1">
                      {config.holyMatrimony.time}
                    </h3>
                    <h1 className="text-4xl w-[250px] text-center text-white font-ovo uppercase">
                      {new Date(config.eventDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                      })}
                      <br />
                      {new Date(config.eventDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </h1>

                    {/* <p className="text-xs mt-2 uppercase tracking-wider">
                      Tap to save
                    </p> */}
                  </button>
                  <button
                    className=" mt-5 px-5 py-1 uppercase text-xs border border-white hover:text-white hover:bg-transparent rounded-full bg-white text-black transition"
                    onClick={downloadCalendar}
                  >
                    Tap to save
                  </button>
                </div>
                {/* Bottom content - countdown */}
                <div
                  ref={slide5Ref}
                  className={`absolute bottom-10 left-0 right-0 z-30 flex items-center flex-col pb-12 ${
                    isSlide5InView ? 'active' : ''
                  } fadeInMove`}
                >
                  <h1 className="text-2xl text-center text-white  font-ovo">
                    ALMOST TIME FOR OURCELEBRATION
                  </h1>
                  {/* Countdown Timer */}
                  <CountdownTimer />
                </div>
              </div>
              {/* Slide Holy Matrimony & Reception */}
              <div
                className={`text-white h-screen snap-start relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8">
                  {config.holyMatrimony.enabled && (
                    <div className="mt-5 mx-auto flex flex-col items-center">
                      <h3 className="uppercase font-ovo text-3xl text-center mt-2">
                        Location
                      </h3>
                      {/* <h3 className="uppercase font-legan text-4xl text-center mb-1">
                        {config.holyMatrimony.time}
                      </h3> */}

                      <img
                        src="/majt.jpg"
                        alt=""
                        className="w-40 h-40 object-cover mx-auto my-4"
                      />

                      <p className="text-4xl text-center font-legan text-white">
                        {config.holyMatrimony.place}
                      </p>
                      <p className="text-xl text-center font-legan text-white">
                        {config.holyMatrimony.place2} <br />{' '}
                        {config.holyMatrimony.place_details}
                      </p>
                      <Link
                        href={config.holyMatrimony.googleMapsLink}
                        target="_blank"
                        className="cursor-pointer hover:text-white/20 text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-5 bg-[#808080] w-fit px-4 py-2 text-white"
                      >
                        Google Maps
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              {/* Slide Gallery */}
              <div className="snap-start text-white h-screen relative overflow-hidden">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-center px-10">
                  {/* OUR GALLERY title */}
                  <div className="flex flex-col items-center mb-8">
                    <h3 className="font-legan text-2xl uppercase tracking-widest text-white/70">
                      Our
                    </h3>
                    <h1 className="font-ovo text-4xl uppercase tracking-wide text-white">
                      Gallery
                    </h1>
                  </div>

                  {/* Photo grid */}
                  <div className="grid grid-cols-2 grid-rows-3 gap-1 h-[55vh]">
                    {[
                      '/slide_1.jpg',
                      '/photo-2.jpeg',
                      '/photo-3.jpeg',
                      '/photo-4.jpeg',
                      '/slide_5.jpg',
                      '/slide_6.jpg',
                    ].map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt=""
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => setLightboxSrc(src)}
                      />
                    ))}
                  </div>
                </div>

                {/* Lightbox */}
                {lightboxSrc && (
                  <div
                    className="absolute inset-0 z-30 bg-black/90 flex items-center justify-center"
                    onClick={() => setLightboxSrc(null)}
                  >
                    <button
                      className="absolute top-4 right-4 text-white text-3xl leading-none hover:opacity-70 transition-opacity"
                      onClick={() => setLightboxSrc(null)}
                    >
                      ×
                    </button>
                    <img
                      src={lightboxSrc}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </div>

              {/* SLIDE 9 */}
              {config.rsvp.enabled && (
                <div className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8 relative overflow-hidden">
                  <div className="absolute inset-5 z-10">
                    <img
                      src="/slide_9.jpg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/40 z-20" />
                  <div
                    ref={slide9Ref}
                    className={`relative z-30 ${isSlide9InView ? 'active' : ''} fadeInMove`}
                  >
                    <h1 className="text-3xl text-white font-ovo text-center uppercase">
                      RSVP AND WISHES
                    </h1>
                    <p className="text-sm font-legan text-white/80 text-center">
                      {config.rsvp.detail}
                    </p>

                    <Form />
                  </div>
                </div>
              )}

              {/* SLIDE 10 */}
              <div className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8 relative overflow-hidden">
                <div className="absolute inset-5 z-10">
                  <img
                    src="/slide_9.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 z-20" />
                <div
                  ref={slide10Ref}
                  className={`relative z-30 ${isSlide10InView ? 'active' : ''} fadeInMove`}
                >
                  <h1 className="text-3xl text-white font-ovo text-center uppercase">
                    Wishes
                  </h1>
                  <WishesList />
                </div>
              </div>

              {/* SLIDE AKHIR */}
              <div className="snap-start text-white h-screen flex flex-col justify-end pt-16 pb-16 px-12 relative overflow-hidden">
                <div className="absolute inset-5 z-10">
                  <img
                    src="/slide_7.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 z-20" />
                <div
                  ref={endRef}
                  className={`relative z-30 bg-black/10 rounded-xl p-5 ${isEndInView ? 'active' : ''} fadeInMove `}
                >
                  <h1 className="text-3xl text-white  font-ovo text-center uppercase">
                    {config.thankyou}
                  </h1>

                  <div className="mt-5 mx-auto flex flex-col ">
                    <p className="text-sm font-legan text-white text-center">
                      {config.thankyouDetail}
                    </p>
                    <p className="text-sm rounded-full text-center font-ovo mt-5 px-6 py-2 text-white uppercase">
                      {config.coupleNames}
                    </p>
                  </div>
                </div>

                <footer className="relative z-30 flex flex-col items-center mt-8">
                  <a
                    href="https://www.instagram.com/yangmuliadavid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline transition"
                  >
                    Created By David
                  </a>
                </footer>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingScreen;

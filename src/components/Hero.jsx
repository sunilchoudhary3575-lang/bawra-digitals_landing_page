import React, { useState } from 'react';
import { heroContent } from '../content';
import { PhoneIcon, MailIcon, PlayIcon } from './Icons';
import { getAssetUrl } from '../utils';
const getEmbedUrl = (url) => {
  let videoId = "";
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  } else {
    videoId = url;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&enablejsapi=1` : null;
};

const Hero = ({ onContactClick }) => {
  const embedUrl = getEmbedUrl(heroContent.youtubeVideoUrl);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const handleVideoPlay = () => {
    if (!videoPlayed) {
      if (window.fbq) {
        window.fbq('trackCustom', 'VideoPlay', {
          video_title: 'Hero Video',
          video_section: 'Hero Section',
          video_platform: 'YouTube'
        });
        console.log('[FB Pixel] Custom: VideoPlay', { video_title: 'Hero Video' });
      }
      setVideoPlayed(true);
    }
  };

  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'CTAClick', {
        button_name: "Let's Connect",
        button_location: 'Hero Section'
      });
    }
    onContactClick();
  };

  const handlePhoneClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'ContactClick', { type: 'phone', location: 'Header' });
    }
  };

  const handleEmailClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'ContactClick', { type: 'email', location: 'Header' });
    }
  };

  return (
    <section data-section="Hero" className="relative min-h-[85vh] sm:min-h-screen flex flex-col items-center justify-center py-4 sm:py-8 md:py-12 lg:py-16 pb-6 sm:pb-8 md:pb-10 lg:pb-12 bg-gradient-to-b from-background to-white">
      {/* Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-10 container-custom py-2 sm:py-3 md:py-4 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={getAssetUrl("/landingpage/assets/logo.png")} alt="Bawra Digitals Logo" className="h-8 sm:h-10 md:h-12 w-auto" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="tel:916377790409" className="flex sm:hidden md:flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-primary transition-colors p-2 -mr-2 sm:mr-0" aria-label="Call us" onClick={handlePhoneClick}>
              <PhoneIcon className="text-base sm:text-sm w-4 h-4" />
              <span className="hidden sm:inline text-sm">+91 6377790409</span>
            </a>
            <a href="mailto:contact@bawradigitals.com" className="flex sm:hidden md:flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-primary transition-colors p-2" aria-label="Email us" onClick={handleEmailClick}>
              <MailIcon className="text-base sm:text-sm w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container-custom mt-8 sm:mt-12 md:mt-16 lg:mt-20 text-center px-4 sm:px-6 pb-0">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-gray-900 leading-tight px-2">
          {heroContent.headline}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 sm:mb-4 md:mb-5 lg:mb-6 max-w-4xl mx-auto leading-relaxed px-2">
          {heroContent.subheading}
        </p>

        {/* Video Player */}
        <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex justify-center px-2">
          <div className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl aspect-video rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden cursor-pointer" onClick={handleVideoPlay}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="Bawra Digitals Hero Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                <div className="text-white text-center p-4 sm:p-6 md:p-8">
                  <p className="text-base sm:text-lg md:text-xl font-semibold mb-2">Hero Video</p>
                  <p className="text-xs sm:text-sm opacity-90">Add YouTube URL in content.js</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 w-full sm:w-auto max-w-xs sm:max-w-none mb-0" aria-label="Connect with us">
          {heroContent.ctaText}
        </button>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState } from 'react';
import { testimonialsContent } from '../content';

const getTestimonialVideoId = (url) => {
  if (!url) return null;
  let videoId = "";
  if (url.includes("youtube.com/shorts/")) {
    const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];
  } else if (url.includes("youtu.be/")) {
    const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];
  } else if (url.includes("youtube.com/watch?v=")) {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (match) videoId = match[1];
  }
  return videoId || null;
};

const VideoThumbnail = ({ videoId, name }) => {
  const [imgSrc, setImgSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);

  return (
    <img
      src={imgSrc}
      alt={`${name} Testimonial`}
      className="w-full h-full object-cover select-none pointer-events-none"
      onError={() => {
        if (imgSrc.includes('maxresdefault.jpg')) {
          setImgSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
        }
      }}
    />
  );
};

const Testimonials = ({ onContactClick }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'CTAClick', {
        button_name: 'Become Our Client',
        button_location: 'Testimonials Section'
      });
    }
    onContactClick();
  };

  return (
    <section id="testimonials" data-section="Testimonials" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="section-title text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{testimonialsContent.title}</h2>
        <p className="section-subtitle text-center text-gray-500 mb-8 sm:mb-12">{testimonialsContent.subtitle}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 justify-center items-start max-w-6xl mx-auto">
          {testimonialsContent.testimonials.map((testimonial, index) => {
            const videoId = getTestimonialVideoId(testimonial.videoUrl);
            const isPlaying = playingIndex === index;

            return (
              <div key={index} className="flex flex-col items-center">
                {/* Phone Mockup Frame */}
                <div className="relative w-full max-w-[190px] sm:max-w-[220px] aspect-[9/16] bg-black rounded-[1.8rem] sm:rounded-[2.2rem] p-[6px] border-[6px] border-black shadow-xl hover:scale-105 transition-transform duration-300 ease-out overflow-hidden">
                  {/* Notch / Dynamic Island */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full z-20 pointer-events-none"></div>
                  
                  {/* Inner Screen */}
                  <div className="w-full h-full rounded-[1.3rem] overflow-hidden bg-gray-900 relative">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                        title={`Testimonial ${index + 1}`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <div 
                        className="w-full h-full cursor-pointer relative group" 
                        onClick={() => setPlayingIndex(index)}
                      >
                        <VideoThumbnail videoId={videoId} name={testimonial.name} />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/45 transition-colors duration-300">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#166534] flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Testimonial Info */}
                <div className="mt-3 flex flex-col items-center text-center">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                    {testimonial.role}
                  </p>
                  {testimonial.badge && (
                    <span className="inline-block bg-[#166534] text-white text-[8px] sm:text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full mt-2 uppercase shadow-sm">
                      {testimonial.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
          <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5" aria-label="Become our client">
            {testimonialsContent.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

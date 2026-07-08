import React from 'react';
import { testimonialsContent } from '../content';

const getTestimonialEmbedUrl = (url) => {
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
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0` : null;
};

const Testimonials = ({ onContactClick }) => {
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
        <h2 className="section-title">{testimonialsContent.title}</h2>
        <p className="section-subtitle">{testimonialsContent.subtitle}</p>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
          {testimonialsContent.testimonials.map((testimonial, index) => {
            const embed = getTestimonialEmbedUrl(testimonial.videoUrl);
            return (
              <div key={index} className="card overflow-hidden p-0 hover:shadow-xl transition-all duration-300">
                <div className="w-full relative bg-gray-900">
                  {testimonial.isShort ? (
                    <div className="w-full aspect-[9/16] max-h-[300px] sm:max-h-[400px] mx-auto rounded-t-xl overflow-hidden">
                      <iframe
                        src={embed}
                        title={`Testimonial ${index + 1}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full min-h-[200px] sm:min-h-[250px] flex items-center justify-center p-4 sm:p-6">
                      <div className="w-full max-w-full aspect-video rounded-xl overflow-hidden">
                        <iframe
                          src={embed}
                          title={`Testimonial ${index + 1}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-2 sm:p-3 md:p-4 text-center bg-white">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{testimonial.name}</p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">{testimonial.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5" aria-label="Become our client">
            {testimonialsContent.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

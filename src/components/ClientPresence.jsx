import React, { useEffect, useRef } from 'react';
import { clientPresenceContent } from '../content';
import { getAssetUrl } from '../utils';

const ClientPresence = ({ onContactClick }) => {
  const containerRefs = useRef([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const cleanups = [];
    const timers = [];

    clientPresenceContent.clients.forEach((_, idx) => {
      const containerEl = containerRefs.current[idx];
      const imgEl = imageRefs.current[idx];
      if (!containerEl || !imgEl) return;

      let currentScroll = 0;
      let userInteracting = false;
      let interactionTimeout = null;

      const handleUserInteraction = () => {
        userInteracting = true;
        if (interactionTimeout) clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          userInteracting = false;
        }, 2000);
      };

      containerEl.addEventListener('touchstart', handleUserInteraction, { passive: true });
      containerEl.addEventListener('touchmove', handleUserInteraction, { passive: true });
      containerEl.addEventListener('mousedown', handleUserInteraction, { passive: true });
      containerEl.addEventListener('wheel', handleUserInteraction, { passive: true });

      const scrollInterval = setInterval(() => {
        if (userInteracting) return;
        const maxScrollHeight = Math.max(0, imgEl.scrollHeight - containerEl.clientHeight);
        if (maxScrollHeight > 0) {
          if (currentScroll < maxScrollHeight) {
            currentScroll += 1;
            containerEl.scrollTop = currentScroll;
          } else {
            currentScroll = 0;
            containerEl.scrollTop = 0;
          }
        }
      }, 20);

      timers.push(scrollInterval);
      cleanups.push(() => {
        clearInterval(scrollInterval);
        if (interactionTimeout) clearTimeout(interactionTimeout);
        containerEl.removeEventListener('touchstart', handleUserInteraction);
        containerEl.removeEventListener('touchmove', handleUserInteraction);
        containerEl.removeEventListener('mousedown', handleUserInteraction);
        containerEl.removeEventListener('wheel', handleUserInteraction);
      });
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'CTAClick', {
        button_name: 'Partner With Us',
        button_location: 'Client Presence Section'
      });
    }
    onContactClick();
  };

  return (
    <section id="client-presence" data-section="ClientPresence" className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {clientPresenceContent.title}
        </h2>
        <p className="section-subtitle text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8">
          {clientPresenceContent.subtitle}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {clientPresenceContent.clients.map((client, idx) => (
            <div key={idx} className="card p-2 sm:p-3 overflow-hidden">
              <a
                href={client.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer group"
                onClick={(e) => {
                  if (e.target.tagName === 'IMG') {
                    window.open(client.instagramUrl, '_blank');
                  }
                }}
              >
                <div
                  ref={(el) => (containerRefs.current[idx] = el)}
                  className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px] overflow-y-auto overflow-x-hidden rounded-lg bg-gray-50 scrollbar-hide border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
                  style={{
                    scrollBehavior: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)',
                    touchAction: 'pan-y',
                  }}
                >
                  <img
                    ref={(el) => (imageRefs.current[idx] = el)}
                    src={getAssetUrl(client.image)}
                    alt={`${client.name} Instagram Profile`}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const errFallback = e.target.nextSibling;
                      if (errFallback) errFallback.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 items-center justify-center bg-gray-100">
                    <p className="text-gray-400 text-xs sm:text-sm">Image not found</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5" aria-label="Partner with us">
            {clientPresenceContent.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientPresence;

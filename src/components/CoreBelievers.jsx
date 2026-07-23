import React, { useState, useEffect, useRef } from 'react';
import { coreBelieversContent } from '../content';
import { getAssetUrl } from '../utils';

const CoreBelievers = ({ onContactClick }) => {
  const logos = coreBelieversContent.logos;
  const halfCount = Math.ceil(logos.length / 2);
  const row1Logos = logos.slice(0, halfCount);
  const row2Logos = logos.slice(halfCount);

  const [firstIndex, setFirstIndex] = useState(0);
  const [firstDragging, setFirstDragging] = useState(false);
  const [firstStartX, setFirstStartX] = useState(0);
  const [firstDragOffset, setFirstDragOffset] = useState(0);
  const row1Ref = useRef(null);

  const [secondIndex, setSecondIndex] = useState(0);
  const [secondDragging, setSecondDragging] = useState(false);
  const [secondStartX, setSecondStartX] = useState(0);
  const [secondDragOffset, setSecondDragOffset] = useState(0);
  const row2Ref = useRef(null);

  const k = 2; // scroll increment step (2 logos at a time)

  // Auto-slide effect for Row 1
  useEffect(() => {
    const timer = setInterval(() => {
      if (!firstDragging) {
        setFirstIndex((prev) => {
          const next = prev + k;
          return next >= row1Logos.length ? 0 : next;
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [firstDragging, row1Logos.length]);

  // Auto-slide effect for Row 2
  useEffect(() => {
    const timer = setInterval(() => {
      if (!secondDragging) {
        setSecondIndex((prev) => {
          const next = prev + k;
          return next >= row2Logos.length ? 0 : next;
        });
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [secondDragging, row2Logos.length]);

  // Drag handlers helper
  const createSliderHandlers = (
    index,
    setIndex,
    isDragging,
    setIsDragging,
    startX,
    setStartX,
    dragOffset,
    setDragOffset,
    ref,
    logoList
  ) => {
    const handleStart = (clientX) => {
      setIsDragging(true);
      setStartX(clientX);
      setDragOffset(0);
      if (ref.current) {
        ref.current.style.cursor = 'grabbing';
      }
    };

    const handleMove = (clientX) => {
      if (!isDragging || !ref.current) return;
      const offset = clientX - startX;
      setDragOffset(offset);

      const percentPerLogo = 100 / k;
      const baseTranslation = -index * percentPerLogo;
      const dragPercent = (offset / ref.current.offsetWidth) * 100;
      ref.current.style.transform = `translateX(calc(${baseTranslation}% + ${dragPercent}px))`;
      ref.current.style.transition = 'none';
    };

    const handleEnd = () => {
      if (!isDragging || !ref.current) return;
      setIsDragging(false);
      if (ref.current) {
        ref.current.style.cursor = 'grab';
        ref.current.style.transition = 'transform 0.5s ease-in-out';
      }

      const threshold = ref.current.offsetWidth * 0.2;
      const maxIndexStep = Math.ceil(logoList.length / k);

      let newIndex = index;
      if (dragOffset > threshold) {
        // Dragged right -> previous
        newIndex = index - k;
        if (newIndex < 0) {
          newIndex = (maxIndexStep - 1) * k;
        }
      } else if (dragOffset < -threshold) {
        // Dragged left -> next
        newIndex = index + k;
        if (newIndex >= logoList.length) {
          newIndex = 0;
        }
      }

      setIndex(newIndex);
      setDragOffset(0);

      const percentPerLogo = 100 / k;
      ref.current.style.transform = `translateX(-${newIndex * percentPerLogo}%)`;
    };

    return {
      onMouseDown: (e) => handleStart(e.clientX),
      onMouseMove: (e) => handleMove(e.clientX),
      onMouseUp: handleEnd,
      onMouseLeave: () => {
        if (isDragging) handleEnd();
      },
      onTouchStart: (e) => handleStart(e.touches[0].clientX),
      onTouchMove: (e) => handleMove(e.touches[0].clientX),
      onTouchEnd: handleEnd,
    };
  };

  const row1Handlers = createSliderHandlers(
    firstIndex,
    setFirstIndex,
    firstDragging,
    setFirstDragging,
    firstStartX,
    setFirstStartX,
    firstDragOffset,
    setFirstDragOffset,
    row1Ref,
    row1Logos
  );

  const row2Handlers = createSliderHandlers(
    secondIndex,
    setSecondIndex,
    secondDragging,
    setSecondDragging,
    secondStartX,
    setSecondStartX,
    secondDragOffset,
    setSecondDragOffset,
    row2Ref,
    row2Logos
  );

  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'CTAClick', {
        button_name: 'Be our client',
        button_location: 'Core Believers Section'
      });
    }
    onContactClick();
  };

  return (
    <section id="clients" data-section="Clients" className="pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 bg-white">
      <div className="container-custom">
        <h2 className="section-title">{coreBelieversContent.title}</h2>
        <p className="section-subtitle text-sm sm:text-base md:text-lg">{coreBelieversContent.subtitle}</p>

        {/* Desktop grid layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
          {logos.map((logo, index) => (
            <div key={index} className="card flex items-center justify-center p-6 h-32 bg-white">
              <img
                src={getAssetUrl(logo.image)}
                alt={logo.name}
                loading="lazy"
                className="max-w-full max-h-20 object-contain hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fb = e.target.nextSibling;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center text-gray-400 text-sm">{logo.name}</div>
            </div>
          ))}
        </div>

        {/* Mobile touch-drag carousel rows */}
        <div className="md:hidden space-y-4">
          {/* Row 1 */}
          <div className="overflow-hidden relative -mx-4 sm:mx-0">
            <div
              ref={row1Ref}
              className="flex transition-transform duration-500 ease-in-out cursor-grab select-none"
              style={{ transform: `translateX(-${firstIndex * (100 / k)}%)` }}
              {...row1Handlers}
            >
              {row1Logos.map((logo, index) => (
                <div key={index} className="min-w-[50%] flex items-center justify-center px-2">
                  <div className="card w-full flex items-center justify-center p-3 sm:p-4 h-20 sm:h-24 bg-white">
                    <img
                      src={getAssetUrl(logo.image)}
                      alt={logo.name}
                      loading="lazy"
                      className="max-w-full max-h-12 sm:max-h-16 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fb = e.target.nextSibling;
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-400 text-xs">{logo.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="overflow-hidden relative -mx-4 sm:mx-0">
            <div
              ref={row2Ref}
              className="flex transition-transform duration-500 ease-in-out cursor-grab select-none"
              style={{ transform: `translateX(-${secondIndex * (100 / k)}%)` }}
              {...row2Handlers}
            >
              {row2Logos.map((logo, index) => (
                <div key={index} className="min-w-[50%] flex items-center justify-center px-2">
                  <div className="card w-full flex items-center justify-center p-3 sm:p-4 h-20 sm:h-24 bg-white">
                    <img
                      src={getAssetUrl(logo.image)}
                      alt={logo.name}
                      loading="lazy"
                      className="max-w-full max-h-12 sm:max-h-16 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fb = e.target.nextSibling;
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-400 text-xs">{logo.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5" aria-label="Be our client">
            {coreBelieversContent.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoreBelievers;

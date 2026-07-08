import React, { useState } from 'react';
import { galleryContent } from '../content';
import { getAssetUrl } from '../utils';

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (index) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const handleNavigate = (direction) => {
    if (activeIndex === null) return;
    const total = galleryContent.images.length;
    if (direction === 'next') {
      setActiveIndex((activeIndex + 1) % total);
    } else {
      setActiveIndex(activeIndex === 0 ? total - 1 : activeIndex - 1);
    }
  };

  return (
    <section id="gallery" data-section="Gallery" className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="section-title">{galleryContent.title}</h2>
        <p className="section-subtitle">{galleryContent.subtitle}</p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {galleryContent.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group active:scale-95 transition-all duration-300 hover:shadow-lg"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={getAssetUrl(img.src)}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x600?text=Gallery+Image+${idx + 1}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeIndex !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate('prev');
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate('next');
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors"
              aria-label="Next image"
            >
              &#8250;
            </button>
            <img
              src={getAssetUrl(galleryContent.images[activeIndex].src)}
              alt={galleryContent.images[activeIndex].alt}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/1200x1200?text=Gallery+Image+${activeIndex + 1}`;
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

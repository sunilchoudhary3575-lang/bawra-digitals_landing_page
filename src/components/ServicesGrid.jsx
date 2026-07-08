import React from 'react';
import { servicesContent } from '../content';
import { getAssetUrl } from '../utils';

const ServicesGrid = ({ onContactClick }) => {
  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'CTAClick', {
        button_name: 'Get Started',
        button_location: 'Services Section'
      });
    }
    onContactClick();
  };

  return (
    <section id="services" data-section="Services" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="section-title">{servicesContent.title}</h2>
        <p className="section-subtitle">{servicesContent.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {servicesContent.services.map((service, index) => (
            <div key={index} className="card group overflow-hidden flex flex-col">
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={getAssetUrl(service.image)}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fb = e.target.nextSibling;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 items-center justify-center">
                  <p className="text-white text-sm font-semibold">Service Image</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-primary mb-3 sm:mb-4">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5" aria-label="Get started">
            {servicesContent.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;

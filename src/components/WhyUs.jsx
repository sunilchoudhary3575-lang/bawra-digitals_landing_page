import React from 'react';
import { whyUsContent } from '../content';
import { CheckCircleIcon } from './Icons';

const WhyUs = ({ onContactClick }) => {
  const handleCtaClick = () => {
    if (window.fbq) {
      window.fbq('trackCustom', 'CTAClick', {
        button_name: 'Join Us',
        button_location: 'Why Us Section'
      });
    }
    onContactClick();
  };

  return (
    <section data-section="WhyUs" className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
      <div className="container-custom">
        <h2 className="section-title">{whyUsContent.title}</h2>
        <p className="section-subtitle">{whyUsContent.subtitle}</p>

        <div className="max-w-4xl mx-auto">
          {/* Stats Badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
            {whyUsContent.stats.map((stat, index) => (
              <div key={index} className="bg-primary text-white rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-6 text-center shadow-lg w-full sm:w-auto min-w-[140px] sm:min-w-0">
                <div className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-1 sm:mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Key Checklist Points */}
          <div className="border-2 border-dashed border-primary rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 bg-gradient-to-br from-background to-white mx-2 sm:mx-0">
            <ul className="space-y-3 sm:space-y-4 md:space-y-5">
              {whyUsContent.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircleIcon className="text-primary text-lg sm:text-xl md:text-2xl flex-shrink-0 mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Link */}
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <button onClick={handleCtaClick} className="btn-primary text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5" aria-label="Join us">
              {whyUsContent.ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

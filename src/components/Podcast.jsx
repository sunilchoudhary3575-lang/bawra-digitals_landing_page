import React from 'react';
import { podcastContent } from '../content';
import { PlayIcon } from './Icons';

const Podcast = () => {
  return (
    <section data-section="Podcast" className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
      <div className="container-custom text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
          {podcastContent.title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-95 leading-relaxed">
          {podcastContent.description}
        </p>
        <a
          href={podcastContent.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 sm:gap-3 bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:scale-95 min-h-[48px]"
        >
          <PlayIcon className="text-xl sm:text-2xl w-6 h-6" />
          <span className="whitespace-nowrap">{podcastContent.ctaText}</span>
        </a>
      </div>
    </section>
  );
};

export default Podcast;

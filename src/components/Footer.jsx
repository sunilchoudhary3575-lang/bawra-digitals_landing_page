import React from 'react';
import { footerContent } from '../content';
import { FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon } from './Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = footerContent.copyright.replace("2024", currentYear.toString());

  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">
              {footerContent.companyName}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              {footerContent.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors block py-1">Services</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors block py-1">Testimonials</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors block py-1">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors block py-1">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h4>
            <div className="flex gap-3 sm:gap-4">
              <a href={footerContent.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors p-2 -ml-2" aria-label="Facebook">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href={footerContent.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors p-2" aria-label="Instagram">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href={footerContent.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors p-2" aria-label="LinkedIn">
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a href={footerContent.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-xl sm:text-2xl text-gray-400 hover:text-white transition-colors p-2" aria-label="YouTube">
                <YoutubeIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

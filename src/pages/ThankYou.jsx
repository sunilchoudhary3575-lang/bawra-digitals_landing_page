import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, PhoneIcon, MailIcon, BackArrowIcon } from '../components/Icons';

const ThankYou = () => {
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Trigger Facebook Pixel conversion logs
    if (window.fbq) {
      window.fbq('track', 'PageView');
      console.log('[FB Pixel] Track: PageView (Thank You Page)');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6 relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircleIcon className="text-white text-5xl w-14 h-14" />
            </div>
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-green-400/30 animate-ping" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your details have been successfully submitted. Our team will reach out to you{' '}
            <strong className="text-primary">shortly</strong> to schedule your consultation.
          </p>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-gray-800 mb-3 text-left">What happens next?</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Our expert will review your requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>You'll receive a call at your preferred time slot</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>We'll create a customized marketing strategy for you</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <p className="text-sm text-gray-500 mb-4">Need immediate assistance?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+916377790409" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <PhoneIcon className="w-4 h-4" />
                <span>+91 6377790409</span>
              </a>
              <a href="mailto:contact@bawradigitals.com" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <MailIcon className="w-4 h-4" />
                <span>contact@bawradigitals.com</span>
              </a>
            </div>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 btn-primary" aria-label="Back to Home">
            <BackArrowIcon className="w-4 h-4 text-white" />
            Back to Home
          </Link>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} Bawra Digitals. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;

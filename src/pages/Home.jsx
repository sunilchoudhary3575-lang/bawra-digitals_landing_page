import React, { useEffect, useRef, Suspense, lazy } from 'react';
import Hero from '../components/Hero';
import CoreBelievers from '../components/CoreBelievers';

// Lazy-loaded sections
const ServicesGrid = lazy(() => import('../components/ServicesGrid'));
const WhyUs = lazy(() => import('../components/WhyUs'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Gallery = lazy(() => import('../components/Gallery'));
const Podcast = lazy(() => import('../components/Podcast'));
const ClientPresence = lazy(() => import('../components/ClientPresence'));
const ContactCTA = lazy(() => import('../components/ContactCTA'));
const ContactForm = lazy(() => import('../components/ContactForm'));
const Footer = lazy(() => import('../components/Footer'));
const FloatingContactButton = lazy(() => import('../components/FloatingContactButton'));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  const formSectionRef = useRef(null);
  const trackedSections = useRef(new Set());

  useEffect(() => {
    // Standard initial PageView trigger
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          const sectionName = entry.target.getAttribute('data-section');
          if (sectionName && !trackedSections.current.has(sectionName)) {
            trackedSections.current.add(sectionName);
            // Trigger FB custom ViewContent event
            if (window.fbq) {
              window.fbq('trackCustom', 'ViewContent', {
                content_name: sectionName,
                content_type: 'section'
              });
              console.log(`[FB Pixel] Track: ViewContent (${sectionName})`);
            }
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToContactForm = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onContactClick={scrollToContactForm} />
      <CoreBelievers onContactClick={scrollToContactForm} />
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesGrid onContactClick={scrollToContactForm} />
        <WhyUs onContactClick={scrollToContactForm} />
        <Testimonials onContactClick={scrollToContactForm} />
        <Gallery />
        <Podcast />
        <ClientPresence onContactClick={scrollToContactForm} />
        <ContactCTA />
        
        {/* Wrapper reference to scroll to form section */}
        <div ref={formSectionRef}>
          <ContactForm />
        </div>
        
        <Footer />
        <FloatingContactButton />
      </Suspense>
    </div>
  );
};

export default Home;

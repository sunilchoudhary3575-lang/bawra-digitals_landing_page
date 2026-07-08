import React from 'react';
import { contactCTAContent } from '../content';
import { MailIcon, GlobeIcon, MapPinIcon, PhoneIcon } from './Icons';

const ContactCTA = () => {
  return (
    <section id="contact-info" data-section="ContactCTA" className="py-6 sm:py-8 md:py-10 lg:py-12 bg-background">
      <div className="container-custom">
        <h2 className="section-title">{contactCTAContent.title}</h2>
        <p className="section-subtitle">{contactCTAContent.subtitle}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div className="space-y-4 sm:space-y-6">
            {/* Contact details */}
            <div className="card">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-4 sm:mb-6">Contact Details</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <PhoneIcon className="text-primary text-lg sm:text-xl mt-1 flex-shrink-0 w-5 h-5" />
                  <div>
                    <a href={`tel:${contactCTAContent.phone.primary}`} className="font-semibold text-gray-900 text-base sm:text-lg block">
                      {contactCTAContent.phone.primary}
                    </a>
                    <a href={`tel:${contactCTAContent.phone.secondary}`} className="text-gray-600 text-sm block mt-1">
                      {contactCTAContent.phone.secondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <MailIcon className="text-primary text-lg sm:text-xl flex-shrink-0 w-5 h-5" />
                  <a href={`mailto:${contactCTAContent.email}`} className="text-gray-900 hover:text-primary transition-colors text-sm sm:text-base break-all">
                    {contactCTAContent.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <GlobeIcon className="text-primary text-lg sm:text-xl flex-shrink-0 w-5 h-5" />
                  <a href={`https://${contactCTAContent.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-primary transition-colors text-sm sm:text-base break-all">
                    {contactCTAContent.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-4 sm:mb-6">Head Office</h3>
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPinIcon className="text-primary text-lg sm:text-xl mt-1 flex-shrink-0 w-5 h-5" />
                <div className="text-gray-700 text-sm sm:text-base">
                  <div>{contactCTAContent.address.line1}</div>
                  <div>{contactCTAContent.address.line2}</div>
                  <div>{contactCTAContent.address.line3}</div>
                  <div>{contactCTAContent.address.line4}</div>
                  <div>{contactCTAContent.address.state} - {contactCTAContent.address.pincode}</div>
                </div>
              </div>
            </div>

            {/* GSTIN */}
            <div className="card">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-3 sm:mb-4">GSTIN</h3>
              <p className="text-gray-700 font-mono text-sm sm:text-base break-all">{contactCTAContent.gstin}</p>
            </div>
          </div>

          {/* Map */}
          <div className="card p-0 overflow-hidden">
            <div className="aspect-square w-full">
              <iframe
                src={contactCTAContent.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bawra Digitals Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

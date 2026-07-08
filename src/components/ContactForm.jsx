import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpinnerIcon, CheckCircleIcon, WarningIcon } from './Icons';

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    clinicName: '',
    jobTitle: '',
    timeSlot: '',
    budget: '',
    goal: '',
    honeypot: ''
  });

  const [status, setStatus] = useState({
    type: null, // 'loading', 'success', 'error'
    message: ''
  });

  const showError = (msg) => {
    setStatus({ type: 'error', message: msg });
    return false;
  };

  const isValidPhone = (num) => {
    return /^[6-9]\d{9}$/.test(num);
  };

  // Generate IST formatted timestamp
  const getISTTimestamp = () => {
    const d = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(d.getTime() + istOffset);

    const year = istDate.getUTCFullYear();
    const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(istDate.getUTCDate()).padStart(2, '0');
    const hours = String(istDate.getUTCHours()).padStart(2, '0');
    const minutes = String(istDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(istDate.getUTCSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} IST`;
  };

  const validateForm = () => {
    if (formData.honeypot) return false;
    if (!formData.fullName.trim()) return showError("Please enter your full name");
    if (!formData.phone.trim()) return showError("Please enter your phone number");
    if (!isValidPhone(formData.phone)) return showError("Please enter a valid 10-digit Indian mobile number");
    if (!formData.city.trim()) return showError("Please enter your city");
    if (!formData.clinicName.trim()) return showError("Please enter hospital / clinic name");
    if (!formData.jobTitle.trim()) return showError("Please enter your job title");
    if (!formData.timeSlot) return showError("Please select a preferred time slot");
    if (!formData.budget) return showError("Minimum monthly marketing budget is ₹40,000");
    if (!formData.goal.trim()) return showError("Please describe your main goal or objective");
    return true;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (e) => {
    // Numeric only and capped at 10 characters
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({
      ...formData,
      phone: val
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Submitting...' });

    // Track intent locally or pixel
    if (window.fbq) {
      window.fbq('trackCustom', 'Submit Form', { content_name: 'Contact Form' });
    }

    if (!validateForm()) return;

    const endpoint = "https://script.google.com/macros/s/AKfycbzQe-oBVYUfCitvxfHqVPdwqiSsYv9B6vso1-YDU1Gwg7aX7b3jN70sCSHLKQVttx18/exec";

    try {
      // Replicate the original dynamic Form and Iframe posting method to avoid CORS preflight hurdles
      const formEl = document.createElement("form");
      formEl.method = "POST";
      formEl.action = endpoint;
      formEl.target = "hidden_iframe_" + Date.now();
      formEl.style.display = "none";

      const iframeEl = document.createElement("iframe");
      iframeEl.name = formEl.target;
      iframeEl.style.display = "none";
      document.body.appendChild(iframeEl);

      const submissionPayload = {
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        clinicName: formData.clinicName,
        jobTitle: formData.jobTitle,
        timeSlot: formData.timeSlot,
        budget: formData.budget,
        goal: formData.goal,
        timestamp: getISTTimestamp()
      };

      Object.entries(submissionPayload).forEach(([key, val]) => {
        const inputEl = document.createElement("input");
        inputEl.type = "hidden";
        inputEl.name = key;
        inputEl.value = val;
        formEl.appendChild(inputEl);
      });

      document.body.appendChild(formEl);
      formEl.submit();

      // Cleanup elements
      setTimeout(() => {
        document.body.removeChild(formEl);
        document.body.removeChild(iframeEl);
      }, 1000);

      // Trigger FB Pixel conversion tracking details
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: "Contact Form Submission",
          content_category: "Healthcare Lead",
          city: formData.city,
          budget: formData.budget,
          job_title: formData.jobTitle
        });
        console.log('[FB Pixel] Track: Lead', { city: formData.city, budget: formData.budget });
      }

      setTimeout(() => {
        navigate('/thankyou');
      }, 500);

    } catch (err) {
      showError("Something went wrong while submitting the form.");
    }
  };

  return (
    <section id="contact" data-section="ContactForm" className="py-6 sm:py-8 md:py-10 lg:py-12 bg-white">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Subheading */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-4">
            <h2 className="section-title lg:text-left lg:px-0 mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              Schedule an Online Meeting
            </h2>
            <p className="section-subtitle lg:text-left lg:px-0 text-slate-600 max-w-lg mx-auto lg:mx-0">
              Share your details and our team will get in touch with you shortly.
            </p>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7 w-full max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="card space-y-4">
              {/* Honeypot field for spam prevention */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white placeholder-slate-400 text-slate-800"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="10-digit Mobile Number (India) *"
                value={formData.phone}
                pattern="[6-9]{1}[0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white placeholder-slate-400 text-slate-800"
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white placeholder-slate-400 text-slate-800"
                required
              />

              <input
                type="text"
                name="clinicName"
                placeholder="Hospital / Clinic Name *"
                value={formData.clinicName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white placeholder-slate-400 text-slate-800"
                required
              />

              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title *"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white placeholder-slate-400 text-slate-800"
                required
              />

              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white text-gray-700"
                required
              >
                <option value="">Preferred Time Slot *</option>
                <option value="10am - 12pm">10am – 12pm</option>
                <option value="12pm - 2pm">12pm – 2pm</option>
                <option value="3pm - 5pm">3pm – 5pm</option>
                <option value="6pm - 8pm">6pm – 8pm</option>
              </select>

              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white text-gray-700"
                required
              >
                <option value="">Monthly Marketing Budget (Min ₹40k) *</option>
                <option value="40k - 60k">₹40k – ₹60k</option>
                <option value="60k - 1L">₹60k – ₹1L</option>
                <option value="1L+">₹1L+</option>
              </select>

              <textarea
                name="goal"
                placeholder="What's your main goal or objective? *"
                value={formData.goal}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-200 bg-white placeholder-slate-400 text-slate-800 resize-none"
                required
              />

              {status.type && (
                <div className={`flex gap-3 p-4 rounded-lg ${
                  status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                  status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                  'bg-blue-50 text-blue-800 border border-blue-200'
                }`}>
                  {status.type === 'loading' ? (
                    <SpinnerIcon className="animate-spin mt-1 w-5 h-5 text-primary" />
                  ) : status.type === 'success' ? (
                    <CheckCircleIcon className="mt-1 w-5 h-5 text-green-600" />
                  ) : (
                    <WarningIcon className="mt-1 w-5 h-5 text-red-600" />
                  )}
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="btn-primary w-full flex justify-center items-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-98 transition-all duration-200"
              >
                {status.type === 'loading' ? (
                  <>
                    <SpinnerIcon className="animate-spin w-5 h-5" />
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

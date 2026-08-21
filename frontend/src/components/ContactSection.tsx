import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { ContactEnquiry } from '../types';

interface ContactSectionProps {
  initialType?: string;
  initialPackage?: string;
  onEnquirySuccess: (enquiry: ContactEnquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialType,
  initialPackage,
  onEnquirySuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    photographyType: initialType || 'Weddings',
    preferredDate: '',
    location: '',
    budget: initialPackage ? `${initialPackage} Package` : '₹35,000 (Signature Package)',
    message: initialPackage ? `Hi Lumora Studio! I would like to enquire and check date availability for the ${initialPackage} package.` : '',
  });

  // Synchronize when parent pre-selects a package or service
  React.useEffect(() => {
    if (initialType) {
      setFormData((prev) => ({ ...prev, photographyType: initialType }));
    }
    if (initialPackage) {
      setFormData((prev) => ({
        ...prev,
        budget: `${initialPackage} Package`,
        message: `Hi Lumora Studio! I would like to book and check date availability for the ${initialPackage} package.`,
      }));
    }
  }, [initialType, initialPackage]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+919876543210';
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '+919876543210';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@lumorastudio.com';

  const cleanWhatsappNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedWhatsappMsg = encodeURIComponent('Hello Lumora Photography! I would like to know more about your photography packages and date availability.');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodedWhatsappMsg}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please enter a valid contact phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please provide a few details regarding your shoot vision or event.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiries/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      setIsSuccess(true);
      onEnquirySuccess(data.data);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        photographyType: 'Weddings',
        preferredDate: '',
        location: '',
        budget: '₹35,000 (Signature Package)',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F8FAFC] border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
              RESERVE YOUR COMMISSION
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
            LET'S CRAFT <span className="font-serif-luxury italic font-normal text-blue-600">YOUR VISION.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Share your shoot dates and creative expectations below. Our lead artistic director reviews every enquiry and responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
            
            {isSuccess ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#090D16]">
                  Enquiry Dispatched Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mt-2 leading-relaxed">
                  Thank you! We have recorded your session request in our studio calendar. A confirmation receipt has been sent to your email.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat Now on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3.5 rounded-xl bg-slate-100 text-[#090D16] text-xs font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="input-enquiry-name"
                      type="text"
                      required
                      placeholder="e.g. Ananya Singhania"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="input-enquiry-email"
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Phone / WhatsApp <span className="text-blue-600">*</span>
                    </label>
                    <input
                      id="input-enquiry-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98200 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none"
                    />
                  </div>

                  {/* Photography Type */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Photography Discipline <span className="text-blue-600">*</span>
                    </label>
                    <select
                      id="select-enquiry-type"
                      value={formData.photographyType}
                      onChange={(e) => setFormData({ ...formData, photographyType: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none cursor-pointer"
                    >
                      <option value="Weddings">Royal & Intimate Weddings</option>
                      <option value="Portraits">Executive & Artist Portraits</option>
                      <option value="Fashion">Fashion Editorial & Lookbook</option>
                      <option value="Events">Corporate Gala & Festival Events</option>
                      <option value="Couples">Couples & Destination Pre-Wedding</option>
                      <option value="Commercial">Commercial Product & Brand</option>
                      <option value="Travel">Travel & Architectural</option>
                      <option value="Lifestyle">Lifestyle & Editorial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <input
                      id="input-enquiry-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none cursor-pointer"
                    />
                  </div>

                  {/* Shoot Location */}
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                      Location / Destination
                    </label>
                    <input
                      id="input-enquiry-location"
                      type="text"
                      placeholder="e.g. Udaipur, Mumbai, Goa, Paris"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Estimated Budget Tier */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Estimated Investment Tier
                  </label>
                  <select
                    id="select-enquiry-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none cursor-pointer"
                  >
                    <option value="₹15,000 (Essential Package)">₹15,000 (Essential Package)</option>
                    <option value="₹35,000 (Signature Package)">₹35,000 (Signature Package - Most Popular)</option>
                    <option value="₹65,000+ (Luxury Package)">₹65,000+ (Luxury Package)</option>
                    <option value="Custom High-End Enterprise">Custom Bespoke / Global Campaign</option>
                  </select>
                </div>

                {/* Message / Vision */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                    Your Shoot Vision & Details <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    id="textarea-enquiry-message"
                    required
                    rows={4}
                    placeholder="Tell us about the occasion, number of looks, aesthetic moodboard references, or any specific requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 bg-[#F8FAFC] text-[#090D16] text-sm font-medium transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  id="btn-submit-enquiry"
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-60 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>DISPATCHING COMMISSION...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>SUBMIT COMMISSION REQUEST</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400 font-medium">
                  🔒 We protect your data. All requests recorded via Django REST Framework.
                </p>
              </form>
            )}

          </div>

          {/* Right Column: Direct Channels & Studio Information */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-[#090D16] mb-6 font-display">
                Direct Studio Concierge
              </h3>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  id="btn-contact-whatsapp"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                      Instant WhatsApp Chat
                    </div>
                    <div className="text-sm font-bold text-[#090D16] mt-0.5">
                      {whatsappNumber}
                    </div>
                  </div>
                </a>

                {/* Direct Call */}
                <a
                  id="btn-contact-call"
                  href={`tel:${phoneNumber}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">
                      Call Studio Desk
                    </div>
                    <div className="text-sm font-bold text-[#090D16] mt-0.5">
                      {phoneNumber}
                    </div>
                  </div>
                </a>

                {/* Email Direct */}
                <a
                  id="btn-contact-email"
                  href={`mailto:${contactEmail}?subject=Photography%20Session%20Enquiry`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider">
                      Official Studio Email
                    </div>
                    <div className="text-sm font-bold text-[#090D16] mt-0.5">
                      {contactEmail}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio Hours & Location Card */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#090D16] mb-4 font-display">
                Studio Headquarters
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#090D16] block">LUMORA Atelier & Studio</strong>
                    Level 4, Creative Media Towers, Worli Sea Face, Mumbai 400030
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#090D16] block">Studio Consultations</strong>
                    Tuesday – Sunday: 10:00 AM – 8:00 PM (By Prior Appointment)
                  </div>
                </div>
              </div>

              {/* Google Map Location Embed */}
              <div className="mt-5 rounded-2xl overflow-hidden border border-slate-200 h-36 bg-slate-100 relative">
                <iframe
                  title="Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120638.1678834925!2d72.78453488828062!3d19.01893962635956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8ce1533519%3A0xb3551528646b3e64!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

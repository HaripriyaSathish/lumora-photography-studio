import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

interface FloatingContactButtonsProps {
  onQuickBookClick: () => void;
}

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({ onQuickBookClick }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+919876543210';
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '+919876543210';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@lumorastudio.com';

  const cleanWhatsappNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedWhatsappMsg = encodeURIComponent('Hello Lumora Photography! I would like to enquire about a photography session.');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodedWhatsappMsg}`;

  return (
    <div
      id="floating-contact-actions"
      className="fixed z-40 right-4 md:right-7 bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex md:flex-col flex-row gap-3 items-center"
    >
      {/* WhatsApp Button */}
      <div className="relative group">
        <a
          id="btn-floating-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredButton('whatsapp')}
          onMouseLeave={() => setHoveredButton(null)}
          className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 animate-float-slow cursor-pointer"
          aria-label="Chat with Lumora Studio on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7 stroke-[2.2]" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </a>

        {/* Desktop Tooltip */}
        <div className="hidden md:flex absolute right-16 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-x-2 group-hover:translate-x-0 items-center">
          <div className="bg-[#090D16] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-1.5 border border-slate-700">
            <span>WhatsApp Studio</span>
            <ArrowUpRight className="w-3 h-3 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Direct Call Button */}
      <div className="relative group">
        <a
          id="btn-floating-call"
          href={`tel:${phoneNumber}`}
          onMouseEnter={() => setHoveredButton('call')}
          onMouseLeave={() => setHoveredButton(null)}
          className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 animate-float-delayed cursor-pointer"
          aria-label="Call Lumora Studio directly"
        >
          <Phone className="w-6 h-6 stroke-[2.2]" />
        </a>

        {/* Desktop Tooltip */}
        <div className="hidden md:flex absolute right-16 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-x-2 group-hover:translate-x-0 items-center">
          <div className="bg-[#090D16] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-1.5 border border-slate-700">
            <span>Call {phoneNumber}</span>
            <ArrowUpRight className="w-3 h-3 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Email Button */}
      <div className="relative group">
        <a
          id="btn-floating-email"
          href={`mailto:${contactEmail}?subject=Photography%20Session%20Enquiry`}
          onMouseEnter={() => setHoveredButton('email')}
          onMouseLeave={() => setHoveredButton(null)}
          className="w-13 h-13 md:w-14 md:h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Send email to Lumora Studio"
        >
          <Mail className="w-6 h-6 stroke-[2.2]" />
        </a>

        {/* Desktop Tooltip */}
        <div className="hidden md:flex absolute right-16 top-1/2 -translate-y-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-x-2 group-hover:translate-x-0 items-center">
          <div className="bg-[#090D16] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl flex items-center gap-1.5 border border-slate-700">
            <span>Email Concierge</span>
            <ArrowUpRight className="w-3 h-3 text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

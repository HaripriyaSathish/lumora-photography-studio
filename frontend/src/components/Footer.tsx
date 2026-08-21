import React from 'react';
import { Camera, Sparkles, ArrowUp, Mail, Phone, MessageCircle, Globe, Share2 } from 'lucide-react';

interface FooterProps {
  onBookSession?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookSession }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+919876543210';
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || '+919876543210';
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'hello@lumorastudio.com';

  return (
    <footer className="bg-[#090D16] text-white pt-20 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <Camera className="w-5 h-5 text-teal-300" />
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-white">
                LUMORA<span className="text-blue-500">.</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Capturing timeless memories, intimate portraits, and royal events with editorial precision and artistic soul.
            </p>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3v6Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Disciplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Disciplines</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#portfolio" className="text-slate-300 hover:text-blue-400 transition-colors">Weddings & Galas</a></li>
              <li><a href="#portfolio" className="text-slate-300 hover:text-blue-400 transition-colors">Fine-Art Portraits</a></li>
              <li><a href="#portfolio" className="text-slate-300 hover:text-blue-400 transition-colors">Fashion & Runways</a></li>
              <li><a href="#portfolio" className="text-slate-300 hover:text-blue-400 transition-colors">Commercial Brands</a></li>
              <li><a href="#portfolio" className="text-slate-300 hover:text-blue-400 transition-colors">Editorial Stories</a></li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="text-slate-300 hover:text-blue-400 transition-colors">About Atelier</a></li>
              <li><a href="#process" className="text-slate-300 hover:text-blue-400 transition-colors">Our Workflow</a></li>
              <li><a href="#packages" className="text-slate-300 hover:text-blue-400 transition-colors">Investment Packages</a></li>
              <li><a href="#testimonials" className="text-slate-300 hover:text-blue-400 transition-colors">Client Accolades</a></li>
              <li><a href="#faq" className="text-slate-300 hover:text-blue-400 transition-colors">Frequently Asked</a></li>
            </ul>
          </div>

          {/* Col 5: Direct Inquiries */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Inquiries</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{phoneNumber}</span>
              </a>
              <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Atelier</span>
              </a>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-teal-400 transition-colors">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>{contactEmail}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LUMORA Haute Photography. All rights reserved.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
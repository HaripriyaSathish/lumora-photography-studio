import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onBookSession: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onBookSession }) => {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+919876543210';
  const cleanWhatsappNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedWhatsappMsg = encodeURIComponent('Hello Lumora Photography! I would like to enquire about reserving a photography session.');
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodedWhatsappMsg}`;

  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* High-Contrast Vibrant Card Container */}
        <div className="relative rounded-3xl bg-[#090D16] text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Decorative Glowing Shapes */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-teal-500/25 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 bottom-0 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          {/* Foreground Content */}
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-300 mb-6 backdrop-blur-md border border-white/15">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase font-mono-accents">
                COMMISSION YOUR LEGACY
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95] mb-6 font-display">
              LET'S CREATE
              <br />
              <span className="font-serif-luxury italic font-normal text-blue-400">SOMETHING TIMELESS.</span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-xl">
              Your story deserves more than ordinary snapshots. Let our atelier craft it with genuine emotion, rich tones, and cinematic editorial mastery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="btn-cta-book-session"
                onClick={onBookSession}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-blue-600/30 hover:shadow-2xl transition-all duration-200 flex items-center gap-3 cursor-pointer"
              >
                <span>RESERVE COMMISSION</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                id="btn-cta-whatsapp"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-extrabold text-sm sm:text-base tracking-wider uppercase backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-200 flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

          {/* Background Camera Aperture Graphical Element */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:flex items-center justify-center opacity-10 pointer-events-none">
            <div className="w-96 h-96 rounded-full border-8 border-dashed border-white animate-spin-slow" />
          </div>

        </div>

      </div>
    </section>
  );
};

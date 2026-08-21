import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, Eye, Aperture, ShieldCheck, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  onViewPortfolio: () => void;
  onBookSession: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewPortfolio, onBookSession }) => {
  const [shutterFlash, setShutterFlash] = useState(false);

  const triggerShutterFlash = () => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 200);
  };

  return (
    <section
      id="home"
      className="relative min-h-[94vh] pt-28 pb-16 lg:pt-36 lg:pb-28 flex items-center bg-white overflow-hidden"
    >
      {/* Visual Shutter Flash Effect Simulation */}
      {shutterFlash && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none opacity-90 transition-opacity duration-200" />
      )}

      {/* Cinematic Hero Background Image Container with Gradient Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=2000"
          alt="LUMORA Studio Cinematic Backdrop"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.96] contrast-[1.04]"
        />
        {/* Multilayer High-Contrast Gradient Scrim to ensure 100% text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70 lg:to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white" />
        
        {/* High-Contrast Color Glow Blobs (Cobalt & Emerald) */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Prestigious Editorial Typography & High-Contrast CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-6">
            
            {/* Live Studio Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 text-white backdrop-blur-md border border-slate-800 shadow-md mb-6 hover:border-blue-500 transition-colors">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-slate-100">
                NOW BOOKING • 2026–2027 SEASONS
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-600 font-extrabold text-white">
                TOP RATED
              </span>
            </div>

            {/* Hero Main Headline with Cormorant Garamond Serif Accent */}
            <h1 className="text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-black tracking-tight text-[#090D16] leading-[1.02] mb-6 select-none">
              <span>CAPTURE YOUR</span>
              <br />
              <span className="relative inline-block text-blue-600 font-serif-luxury italic font-normal tracking-normal">
                Timeless Legacies.
                {/* High-Contrast Underline Accent in Vivid Emerald */}
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 rounded-full opacity-80" />
              </span>
            </h1>

            {/* Editorial Supporting Content */}
            <p className="text-base sm:text-xl text-slate-700 max-w-xl font-normal leading-relaxed mb-8">
              Bespoke wedding, haute-couture portrait, and commercial photography rendered with <strong className="text-[#090D16] font-bold">medium-format fidelity</strong>, <strong className="text-blue-600 font-bold">16-bit color science</strong>, and profound emotional authenticity.
            </p>

            {/* Action Buttons with High-Contrast Hover & Magnetic Glow */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                id="btn-hero-book"
                onClick={onBookSession}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>RESERVE YOUR DATE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-portfolio"
                onClick={onViewPortfolio}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#090D16] hover:bg-slate-800 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Eye className="w-5 h-5 text-teal-400" />
                <span>EXPLORE PORTFOLIO</span>
              </button>

              {/* Shutter Simulator Trigger */}
              <button
                onClick={triggerShutterFlash}
                title="Simulate Shutter Capture"
                className="hidden sm:inline-flex p-4 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-300 shadow-sm transition-all hover:scale-105 cursor-pointer"
              >
                <Aperture className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 mt-8 border-t border-slate-200/80 w-full max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#090D16] font-mono-accents">
                  500<span className="text-blue-600">+</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Stories Captured
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#090D16] font-mono-accents">
                  120<span className="text-teal-600">+</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Royal Weddings
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#090D16] font-mono-accents">
                  4.99<span className="text-amber-500">★</span>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Client Rating
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Visual Showcase Frame with Rotating Aperture & Badges */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Rotating Camera Aperture Accent in Background */}
              <div className="absolute -top-12 -right-12 w-64 h-64 text-blue-600/10 animate-spin-slow pointer-events-none">
                <Aperture className="w-full h-full" />
              </div>

              {/* Main Editorial Hero Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 z-10 group transform transition-transform duration-500 hover:scale-[1.01]">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200"
                  alt="Lumora Master Wedding Portrait"
                  className="w-full h-[440px] sm:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                
                {/* Live Editorial Overlay Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-[#090D16]/85 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 border border-white/10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>MASTERPIECE NO. 42</span>
                </div>

                {/* Bottom Photo Metadata Strip */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                  <div className="text-xs font-mono-accents text-blue-400 font-bold uppercase tracking-wider">
                    UDAIPUR PALACE • 85MM F/1.4
                  </div>
                  <div className="text-sm sm:text-base font-bold font-serif-luxury italic text-white/95">
                    "The Royal Heritage Vows at Sunset"
                  </div>
                </div>
              </div>

              {/* Smaller Overlapping Image Frame */}
              <div className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=600"
                  alt="Lumora Editorial Portrait"
                  className="w-full h-44 sm:h-56 object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-center text-white text-[11px] font-bold">
                  Portrait & Character
                </div>
              </div>

              {/* Floating Badge 1: 500+ Stories */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#090D16] uppercase tracking-wide">
                    Award-Winning
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold">
                    Global Photography Guild
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: EST. 2018 */}
              <div className="absolute bottom-16 -right-4 bg-[#090D16] text-white px-4 py-2.5 rounded-xl shadow-xl z-20 flex items-center gap-2 border border-slate-800 animate-float-delayed">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  EST. 2018 • MUMBAI & GLOBAL
                </span>
              </div>

              {/* Decorative Geometric Accent Box */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-dashed border-blue-500/30 rounded-3xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Check, Film, Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ stories: 0, weddings: 0, brands: 0, years: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1500;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
            const currentEase = easeOut(progress);

            setCounts({
              stories: Math.floor(currentEase * 500),
              weddings: Math.floor(currentEase * 120),
              brands: Math.floor(currentEase * 80),
              years: Math.floor(currentEase * 8),
            });

            if (frame === totalFrames) {
              clearInterval(timer);
              setCounts({ stories: 500, weddings: 120, brands: 80, years: 8 });
            }
          }, frameDuration);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-white border-t border-slate-100 relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Curated Photography Showcase with Framing */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1000"
                alt="Lumora Creative Studio behind the scenes"
                className="w-full h-[480px] sm:h-[560px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* High Contrast Overlay Quote */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#090D16]/95 via-[#090D16]/60 to-transparent p-7 text-white">
                <p className="text-base font-serif-luxury italic font-normal tracking-wide text-white/95 leading-relaxed">
                  "Every master photograph is a sacred dialogue between human intimacy, architectural form, and deliberate illumination."
                </p>
                <div className="text-xs font-extrabold text-teal-400 uppercase tracking-widest mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>LUMORA ARTISTIC DIRECTORS</span>
                </div>
              </div>
            </div>

            {/* Experience Stamp Badge */}
            <div className="absolute -top-5 -left-5 bg-[#090D16] text-white p-4.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800 animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Film className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase font-extrabold tracking-wider text-white">Mastery & Craft</div>
                <div className="text-[11px] text-teal-400 font-bold">ESTABLISHED 2018</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Live Animated Stats */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-extrabold tracking-[0.18em] uppercase">
                THE LUMORA ATELIER
              </span>
            </div>

            {/* Editorial Heading with Serif Elegance */}
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16] leading-[1.08] mb-6">
              WE DON'T JUST CAPTURE FRAMES.
              <br />
              <span className="font-serif-luxury italic font-normal text-blue-600">We Immortalize Your Legacy.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
              Founded on the conviction that transcendent photography emerges when authentic human connection meets uncompromising optical discipline, LUMORA is an internationally recognized studio serving visionary couples, leaders, and luxury brands worldwide.
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Whether directing high-concept haute couture campaigns, documenting multi-day royal destination celebrations, or crafting executive fine-art portraits, our work rejects transient social media presets in favor of rich 16-bit color fidelity, nuanced shadow details, and enduring emotional gravity.
            </p>

            {/* Highlights Grid with Cobalt & Emerald Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors">
                <div className="p-1.5 rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#090D16]">Dual Master Redundancy</h4>
                  <p className="text-xs text-slate-600 mt-1">Simultaneous primary and candid coverage with zero missed moments.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition-colors">
                <div className="p-1.5 rounded-lg bg-teal-600 text-white shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#090D16]">Bespoke Cine Color Grading</h4>
                  <p className="text-xs text-slate-600 mt-1">Proprietary tone curves tailored to organic skin textures.</p>
                </div>
              </div>
            </div>

            {/* 4 Animated Counter Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full pt-6 border-t border-slate-200">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-center hover:border-blue-500 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono-accents">
                  {counts.stories}+
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
                  Stories Told
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-center hover:border-teal-500 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 font-mono-accents">
                  {counts.weddings}+
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
                  Weddings
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-center hover:border-indigo-500 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-mono-accents">
                  {counts.brands}+
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
                  Luxury Brands
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200 text-center hover:border-slate-800 hover:shadow-md transition-all">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#090D16] font-mono-accents">
                  {counts.years}+
                </div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
                  Years Craft
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Aperture, SunMedium, Layers, ShieldCheck, Cpu, SlidersHorizontal, Award, Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const pillars = [
    {
      icon: Aperture,
      title: 'Medium-Format Dynamic Range',
      subtitle: '100+ Megapixels of Unfiltered Texture',
      description:
        'We capture on high-resolution medium format systems that capture 16 stops of dynamic range. Highlights never clip, and shadows retain rich, velvety details for billboard-scale prints.',
      badge: 'OPTICAL BENCHMARK',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: SunMedium,
      title: 'Architectural Light Shaping',
      subtitle: 'Sculpting Dimension & Atmosphere',
      description:
        'Light is our brush. Combining Swiss Broncolor parabolic reflectors and soft diffused modifiers, we contour cheekbones and wrap subjects in flattering, three-dimensional luminescence.',
      badge: 'LIGHTING SCIENCE',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      icon: Layers,
      title: 'Cinematic Color Grading',
      subtitle: '16-Bit Filmic Color Space',
      description:
        'Every tone is calibrated against bespoke LUT curves inspired by Kodak and Fuji cine film stocks. Skin tones remain naturally luminous while ambient hues possess rich, editorial saturation.',
      badge: 'COLOR CALIBRATION',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      icon: ShieldCheck,
      title: 'Museum-Grade Archival Heritage',
      subtitle: 'Pigments Rated For 100+ Years',
      description:
        'Your legacy deserves permanence. Our physical print deliverables use 310gsm 100% cotton-rag Hahnemühle paper paired with archival mineral pigment inks.',
      badge: 'PRINT STANDARD',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const gearSpecs = [
    { label: 'Primary Bodies', value: 'Hasselblad X2D 100C & Sony Alpha 1' },
    { label: 'Prime Optics', value: 'Sony G-Master 24-70mm f/2.8 & 85mm f/1.2 GM' },
    { label: 'Studio Strobe Systems', value: 'Broncolor Siros 800L & Profoto B10X Plus' },
    { label: 'Continuous Cinema Light', value: 'Aputure 600d Pro with Light Dome III' },
    { label: 'Monitor Calibration', value: 'EIZO ColorEdge 4K with Calibrite ColorChecker' },
    { label: 'Aerial Perspective', value: 'DJI Mavic 3 Cine (Apple ProRes 422 HQ)' },
  ];

  return (
    <section id="philosophy" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full border border-slate-100 -z-0" />
      <div className="absolute top-1/2 -right-20 w-64 h-64 rounded-full border border-blue-50 -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CRAFT & TECHNICAL PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#090D16] tracking-tight">
              Where Raw Emotion Meets{' '}
              <span className="font-serif-luxury italic font-normal text-blue-600">Uncompromising Science</span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We reject fleeting filters. Our methodology combines rigorous color theory, masterclass light-shaping, and medium-format optics.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid with High-Contrast Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 hover:bg-white hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 text-blue-600 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-600/30">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider border ${pillar.badgeClass}`}>
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#090D16] mb-2 group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  {pillar.subtitle}
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>

                {/* Subtle bottom line on hover */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

        {/* The Gear Vault & Hardware Specification Bar */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#090D16] text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-accents text-blue-400 uppercase tracking-widest mb-1">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>PRODUCTION ARSENAL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display">The LUMORA Gear Vault</h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-bold tracking-wider uppercase text-slate-300">
                Calibrated Weekly in Cleanroom
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gearSpecs.map((spec, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    {spec.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

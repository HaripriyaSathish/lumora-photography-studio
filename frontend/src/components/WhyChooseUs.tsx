import React from 'react';
import {
  Compass,
  Camera,
  Users,
  Zap,
  Palette,
  Heart,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Compass className="w-6 h-6 text-blue-600" />,
      title: 'Artistic Direction',
      description: 'Comprehensive moodboard curation, lighting choreography, and bespoke styling advice prior to every shoot.'
    },
    {
      icon: <Camera className="w-6 h-6 text-teal-600" />,
      title: 'Medium-Format Optics',
      description: 'Hasselblad 100MP and Sony G-Master prime glass for unmatched micro-contrast and 4K fine-art sharpness.'
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: 'Seasoned Master Team',
      description: 'Over 8 years of documenting high-profile weddings, international galas, and celebrity lookbooks.'
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: '48-Hour Highlight Delivery',
      description: 'Expedited 48-hour social preview batches and complete retouched masters delivered on guaranteed timelines.'
    },
    {
      icon: <Palette className="w-6 h-6 text-blue-600" />,
      title: 'Fine-Art Color Science',
      description: 'Custom analog-inspired color science and individual tone curves that never look dated.'
    },
    {
      icon: <Heart className="w-6 h-6 text-teal-600" />,
      title: 'Effortless Client Comfort',
      description: 'Calm, patient posing direction that makes even camera-shy subjects feel radiant, relaxed, and authentic.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden">
      
      {/* Huge Background Watermark Number: 08 */}
      <div className="absolute right-6 -bottom-10 select-none pointer-events-none opacity-[0.03] text-[#090D16] text-[260px] sm:text-[340px] font-extrabold font-display leading-none">
        08
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
                THE LUMORA STANDARD
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
              WHY <span className="font-serif-luxury italic font-normal text-blue-600">LUMORA?</span>
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="text-3xl font-extrabold text-[#090D16] font-mono-accents">
              08
            </div>
            <div className="text-xs font-extrabold text-slate-700 uppercase tracking-widest leading-tight">
              YEARS OF VISUAL<br />STORYTELLING
            </div>
          </div>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 group hover:-translate-y-1.5"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                {pillar.icon}
              </div>

              <h3 className="text-xl font-bold text-[#090D16] mb-2 group-hover:text-blue-600 transition-colors font-serif-luxury italic text-2xl">
                {pillar.title}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

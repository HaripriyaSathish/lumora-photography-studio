import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Camera, Palette, Box, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onBookSession: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onBookSession }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Discovery & Vision Moodboard',
      subtitle: 'Understanding Your Story',
      description:
        'Every master photograph begins with intimate creative alignment. We collaborate on visual themes, wardrobe palettes, ideal lighting conditions, and tailored location scouts to construct a detailed moodboard that mirrors your unique aesthetic.',
      highlights: [
        'Personal consultation (In-Studio or Video Call)',
        'Custom Pinterest & Art Direction Moodboard',
        'Location scouting & Golden-Hour sun trajectory mapping',
        'Wardrobe, hair & styling coordination guide',
      ],
      icon: Compass,
      accent: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      number: '02',
      title: 'The Shoot Choreography',
      subtitle: 'Cinematic Precision & Fluid Direction',
      description:
        'On set, we create a relaxed, spontaneous environment where genuine emotions unfold naturally. Using medium-format prime lenses and subtle light-shaping, we guide you seamlessly without stiff, artificial posing.',
      highlights: [
        'Dual master photographers capturing candid & editorial angles',
        'Pro daylight-balanced Profoto & Broncolor continuous lighting',
        'Real-time iPad tethering for instantaneous preview checks',
        'Zero-stress pacing with playlist curated to your vibe',
      ],
      icon: Camera,
      accent: 'from-teal-600 to-emerald-600',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      number: '03',
      title: 'Fine-Art Retouching & Grading',
      subtitle: 'Pixel-Level Perfection',
      description:
        'We do not apply generic presets. Each selected capture undergoes customized frequency separation retouching, skin tone preservation, dynamic range recovery, and signature filmic color science that retains authentic texture.',
      highlights: [
        'Proprietary cinematic color grading recipe',
        'Non-destructive frequency-separation skin retouching',
        'Lens distortion & chromatic aberration correction',
        'Full high-dynamic-range (HDR) tonal balance',
      ],
      icon: Palette,
      accent: 'from-indigo-600 to-purple-600',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      number: '04',
      title: 'Heirloom Delivery & Digital Vault',
      subtitle: 'Crafted to Outlive Generations',
      description:
        'Receive your private 4K cloud gallery with uncompressed downloads, plus bespoke Italian leather albums printed on archival museum-grade cotton rag paper guaranteed to resist fading for over 100 years.',
      highlights: [
        'Lifetime access to password-protected 4K Cloud Vault',
        'Handcrafted Italian leather flush-mount albums',
        'Full personal & commercial usage license included',
        '48-Hour express highlight batch for immediate sharing',
      ],
      icon: Box,
      accent: 'from-emerald-600 to-cyan-600',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#F8FAFC] border-y border-slate-200 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-4">
            <span>THE LUMORA JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#090D16] tracking-tight mb-4">
            How We Turn Fleeting Moments Into{' '}
            <span className="font-serif-luxury italic font-normal text-blue-600">Timeless Masterpieces</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Our systematic, four-stage creative protocol guarantees effortless comfort in front of the lens and peerless technical precision in every delivered frame.
          </p>
        </div>

        {/* Interactive Step Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 relative border cursor-pointer ${
                  isActive
                    ? 'bg-white shadow-xl shadow-blue-500/10 border-blue-500 scale-[1.02] ring-2 ring-blue-500/20'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-2xl font-black font-mono-accents ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-bold text-[#090D16] text-base mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-1">{step.subtitle}</p>

                {isActive && (
                  <motion.div
                    layoutId="activeStepIndicator"
                    className="absolute bottom-0 inset-x-4 h-1 bg-gradient-to-r from-blue-600 to-teal-500 rounded-t-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Deep Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  STAGE {steps[activeStep].number} OF 04
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {steps[activeStep].subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#090D16]">
                {steps[activeStep].title}
              </h3>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {steps[activeStep].description}
              </p>

              {/* High-Impact Highlights Checklist */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  WHAT IS DELIVERED IN THIS STAGE
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {steps[activeStep].highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onBookSession}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide uppercase shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>RESERVE YOUR EXPERIENCE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Next Step: {steps[(activeStep + 1) % steps.length].title}
                </button>
              </div>
            </div>

            {/* Right: Stage Stats & Guarantee Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0F172A] text-white p-8 rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-mono-accents uppercase tracking-widest text-slate-400">
                    BENCHMARK STANDARD
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                    100% QUALITY PROMISE
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-extrabold text-blue-400 font-display">Zero Guesswork</div>
                    <p className="text-xs text-slate-300 mt-1">
                      Every location, pose, and lighting scenario is mapped prior to the session for complete peace of mind.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-extrabold text-teal-400 font-display">Sub-Pixel Retouching</div>
                    <p className="text-xs text-slate-300 mt-1">
                      16-bit color fidelity ensures skin tones look organic, smooth, and vibrant without plastic softening.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-extrabold text-indigo-400 font-display">100-Year Archival</div>
                    <p className="text-xs text-slate-300 mt-1">
                      Albums printed on heavy cotton-rag with pigment inks certified against UV degradation and humidity.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Average turnaround time: <strong className="text-white">7 to 14 Business Days</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

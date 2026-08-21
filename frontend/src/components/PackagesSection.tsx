import React from 'react';
import { Check, Sparkles, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Package } from '../types';

interface PackagesSectionProps {
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ packages, onSelectPackage }) => {
  return (
    <section id="packages" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
              TRANSPARENT INVESTMENT TIERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
            CURATED <span className="font-serif-luxury italic font-normal text-blue-600">COLLECTIONS.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Comprehensive photography collections designed for clarity, luxury physical deliverables, and lifetime archival value.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const isSignature = pkg.isPopular;

            return (
              <div
                key={pkg.id}
                id={`pkg-card-${pkg.id}`}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 ${
                  isSignature
                    ? 'bg-white border-2 border-blue-600 shadow-2xl shadow-blue-600/15 lg:-translate-y-3 z-10'
                    : 'bg-[#F8FAFC] border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Popular Badge */}
                {isSignature && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-black tracking-widest uppercase shadow-md flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-300 fill-teal-300" />
                    <span>{pkg.badge || 'MOST POPULAR'}</span>
                  </div>
                )}

                <div>
                  {/* Package Title & Tagline */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#090D16] font-serif-luxury italic">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-8 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Starting Investment
                    </div>
                    <div className="text-4xl font-extrabold text-[#090D16] font-mono-accents mt-1">
                      {pkg.price}
                      <span className="text-xs font-semibold text-slate-500 font-sans ml-1">/ session</span>
                    </div>
                    <div className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1.5">
                      <span>⏱ {pkg.duration}</span>
                    </div>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                      Included Deliverables:
                    </div>
                    {pkg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <div className="p-0.5 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Choose Package CTA Button */}
                <button
                  id={`btn-select-pkg-${pkg.id}`}
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    isSignature
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:shadow-2xl'
                      : 'bg-[#090D16] hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>CHOOSE {pkg.name.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Bespoke Note */}
        <div className="mt-14 text-center">
          <p className="text-sm text-slate-600">
            Need custom destination wedding coverage, multi-city brand licensing, or aerial FPV cinematics?{' '}
            <a href="#contact" className="font-bold text-blue-600 hover:underline">
              Request a custom bespoke quote &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};

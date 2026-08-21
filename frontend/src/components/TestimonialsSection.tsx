import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = testimonials[currentIndex] || testimonials[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (!current) return null;

  return (
    <section id="testimonials" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
            PRAISE FROM <span className="font-serif-luxury italic font-normal text-blue-600">OUR CLIENTS.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Read how we brought timeless emotions and precision vision to couples, artists, and global brands.
          </p>
        </div>

        {/* Balanced 50/50 Split Card */}
        <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">
          
          {/* Left 50%: Large Captured Photograph from Session */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] bg-slate-900">
            <img
              src={current.featuredPhotoUrl || current.clientAvatar}
              alt={`${current.clientName} Session`}
              className="w-full h-full object-cover object-center brightness-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/90 via-[#090D16]/20 to-transparent" />
            
            {/* Overlay Tag */}
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                {current.category}
              </span>
              <div className="text-sm font-semibold text-slate-200 mt-0.5">
                📍 {current.location} • {current.eventDate}
              </div>
            </div>
          </div>

          {/* Right 50%: Testimonial Content */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Icon & Text */}
              <Quote className="w-10 h-10 text-blue-600/20 mb-4" />
              
              <blockquote className="text-lg sm:text-xl font-serif-luxury italic text-[#090D16] leading-relaxed tracking-tight mb-8 text-2xl">
                "{current.quote}"
              </blockquote>
            </div>

            <div>
              {/* Client Info & Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src={current.clientAvatar}
                    alt={current.clientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                  />
                  <div>
                    <h4 className="text-base font-bold text-[#090D16]">
                      {current.clientName}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500">
                      {current.category}
                    </p>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2">
                  <button
                    id="btn-prev-testimonial"
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white hover:bg-blue-600 text-[#090D16] hover:text-white border border-slate-300 hover:border-blue-600 transition-all cursor-pointer shadow-xs"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    id="btn-next-testimonial"
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white hover:bg-blue-600 text-[#090D16] hover:text-white border border-slate-300 hover:border-blue-600 transition-all cursor-pointer shadow-xs"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center gap-1.5 mt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

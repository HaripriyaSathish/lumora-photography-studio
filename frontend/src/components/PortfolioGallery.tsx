import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ArrowUpRight, Camera, Maximize2, Sliders, MapPin, Calendar } from 'lucide-react';
import { GalleryImage } from '../types';
import { LightboxModal } from './LightboxModal';

interface PortfolioGalleryProps {
  galleryImages: GalleryImage[];
  selectedCategorySlug?: string;
  onBookSession: () => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  galleryImages,
  selectedCategorySlug,
  onBookSession,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedCategorySlug || 'all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Synchronize if category selection from parent updates
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setActiveFilter(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const filterTabs = [
    { label: 'ALL MASTERWORKS', value: 'all' },
    { label: 'WEDDINGS', value: 'wedding' },
    { label: 'PORTRAITS', value: 'portrait' },
    { label: 'FASHION', value: 'fashion' },
    { label: 'EVENTS', value: 'event' },
    { label: 'COMMERCIAL', value: 'commercial' },
  ];

  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return galleryImages.slice(0, 8); // Streamlined top 8 curated showcase
    return galleryImages.filter(
      (item) => item.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [galleryImages, activeFilter]);

  return (
    <section id="portfolio" className="py-24 bg-white border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
                CURATED MASTERWORKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
              PORTFOLIO <span className="font-serif-luxury italic font-normal text-blue-600">ATELIER.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-xl">
              A curated collection of medium-format captures. Select any work to inspect fine-art color grading, lighting blueprints, and high-resolution details.
            </p>
          </div>

          {/* Filter Pills with Motion Animation */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F8FAFC] rounded-2xl border border-slate-200">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  id={`filter-tab-${tab.value}`}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-slate-700 hover:text-[#090D16] hover:bg-slate-200/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-blue-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Masonry-Style Image Grid with Rich Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {filteredImages.map((img, index) => {
            const isFeaturedLarge = img.isFeatured && index === 0;
            const rowSpan = isFeaturedLarge ? 'sm:row-span-2' : img.aspectRatio === 'portrait' ? 'sm:row-span-2' : 'sm:row-span-1';

            return (
              <div
                key={img.id}
                id={`gallery-item-${img.id}`}
                onClick={() => setLightboxImage(img)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-200 hover:border-blue-500/80 shadow-md hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ${rowSpan}`}
              >
                {/* Image with zoom on hover */}
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Multilayer Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/95 via-[#090D16]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6" />

                {/* Top Badge: Category & Featured Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[#090D16] text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    {img.category}
                  </span>
                  {img.isFeatured && (
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500 text-white text-[11px] font-bold shadow-md">
                      ⭐ Featured Master
                    </span>
                  )}
                </div>

                {/* Top Right Zoom Trigger */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 hover:bg-blue-700 hover:scale-110">
                  <Maximize2 className="w-5 h-5" />
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white tracking-tight font-serif-luxury italic text-2xl">
                    {img.title}
                  </h3>
                  
                  {img.clientName && (
                    <div className="text-xs text-teal-300 font-bold mt-1">
                      Client: {img.clientName}
                    </div>
                  )}

                  {img.location && (
                    <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{img.location}</span>
                    </div>
                  )}
                </div>

                {/* Hover Accent Line in Cobalt */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Prompt Strip */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-[#090D16]">
              Looking for a custom editorial lookbook or destination package?
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Connect directly with our lead creative directors to tailor bespoke moodboards, gear setups, and schedules.
            </p>
          </div>

          <button
            onClick={onBookSession}
            className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
          >
            REQUEST BESPOKE QUOTE
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        image={lightboxImage}
        images={filteredImages}
        onClose={() => setLightboxImage(null)}
        onSelectImage={(newImg) => setLightboxImage(newImg)}
      />
    </section>
  );
};

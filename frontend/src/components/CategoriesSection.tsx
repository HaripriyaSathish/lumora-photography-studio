import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (slug: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, onSelectCategory }) => {
  return (
    <section id="categories" className="py-24 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
                CURATED DISCIPLINES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
              PHOTOGRAPHY <span className="font-serif-luxury italic font-normal text-blue-600">DISCIPLINES.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3">
              Explore our core specializations crafted across editorial weddings, high-concept fashion, executive portraits, and commercial campaigns.
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-white px-4 py-2 rounded-xl border border-slate-200 inline-block shadow-sm">
              SELECT ANY DISCIPLINE TO FILTER PORTFOLIO
            </div>
          </div>
        </div>

        {/* Categories Grid (Asymmetric Editorial Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const isTall = index === 0 || index === 5;

            return (
              <div
                key={cat.id}
                id={`cat-card-${cat.slug}`}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-[#090D16] shadow-md hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500 border border-slate-200 hover:border-blue-500 ${
                  isTall ? 'sm:row-span-2 min-h-[380px] sm:min-h-[440px]' : 'min-h-[300px] sm:min-h-[340px]'
                }`}
              >
                {/* High-Res Image */}
                <img
                  src={cat.coverImage}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-[0.88] group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Dark Editorial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/95 via-[#090D16]/40 to-transparent group-hover:from-[#090D16]/85 transition-colors duration-300" />

                {/* Top Badge: Category Index */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white font-mono text-[11px] font-bold tracking-widest border border-white/20">
                    0{index + 1}
                  </span>
                </div>

                {/* Arrow Action Icon Button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#090D16] flex items-center justify-center shadow-lg group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300 transform translate-y-1 opacity-90 group-hover:opacity-100 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                {/* Content Overlay at Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform transition-transform duration-300">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-teal-300 transition-colors font-serif-luxury italic text-3xl">
                    {cat.name}
                  </h3>
                  
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
                    {cat.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400 mt-3 group-hover:translate-x-1 transition-transform">
                    <span>Explore Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Bottom Border Glow on Hover */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

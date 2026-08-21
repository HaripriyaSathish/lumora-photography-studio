import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, User, Eye, Sparkles } from 'lucide-react';
import { GalleryImage } from '../types';

interface LightboxModalProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onSelectImage: (image: GalleryImage) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  image,
  images,
  onClose,
  onSelectImage,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!image) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (image) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [image, images]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onSelectImage(images[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onSelectImage(images[nextIndex]);
  };

  return (
    <div
      id="portfolio-lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/95 backdrop-blur-xl p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center gap-3 bg-[#101828]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white">
          <span className="w-2 h-2 rounded-full bg-[#FF5A36] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD23F]">
            {image.category}
          </span>
          <span className="text-slate-400 text-xs font-mono">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          id="btn-close-lightbox"
          onClick={onClose}
          className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-[#FF5A36] text-white transition-all cursor-pointer border border-white/20 hover:scale-105"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        id="btn-lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-[#FF5A36] text-white transition-all cursor-pointer border border-white/20 hover:scale-110 z-20"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        id="btn-lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-[#FF5A36] text-white transition-all cursor-pointer border border-white/20 hover:scale-110 z-20"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Frame & Metadata Modal */}
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center justify-center pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-white/20 max-h-[75vh] flex items-center justify-center">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[72vh] w-auto max-w-full object-contain select-none"
          />
        </div>

        {/* Caption & Metadata Footer */}
        <div className="w-full max-w-3xl bg-white rounded-2xl p-5 sm:p-6 mt-4 shadow-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#101828]">
              {image.title}
            </h3>
            {image.description && (
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {image.description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
            {image.clientName && (
              <div className="flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5 text-[#FF5A36]" />
                <span>{image.clientName}</span>
              </div>
            )}
            {image.location && (
              <div className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>{image.location}</span>
              </div>
            )}
            {image.year && (
              <div className="flex items-center gap-1 font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{image.year}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

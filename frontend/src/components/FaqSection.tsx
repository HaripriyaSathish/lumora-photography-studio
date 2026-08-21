import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion, CheckCircle2 } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Session Planning',
      question: 'How far in advance should we reserve our wedding or campaign shoot?',
      answer:
        'For weddings and grand destination events, we recommend booking 4 to 8 months in advance, especially for the peak October–March season. For portrait, fashion lookbook, or commercial sessions, a lead time of 2 to 4 weeks is typically sufficient. A 30% retainer locks in your exclusive date.',
    },
    {
      category: 'Wardrobe & Styling',
      question: 'Do you provide guidance on wardrobe, outfits, and location styling?',
      answer:
        'Yes! Once booked, you will receive our comprehensive 18-page LUMORA Styling & Palette Guide. We provide direct consultation on color harmony, texture layering (avoiding conflicting micro-patterns), and outfit transitions for different lighting times (Golden Hour vs Studio High-Key).',
    },
    {
      category: 'Delivery & Turnaround',
      question: 'When will we receive our photos, and in what resolution are they delivered?',
      answer:
        'You will receive an exclusive 48-Hour Sneak Peek batch (15–20 high-res highlights) to share on social media. The complete curated, color-graded, and master-retouched collection is delivered via your private 4K Cloud Vault within 7 to 14 business days. All files are 100% full-resolution JPEG/TIFF without watermarks.',
    },
    {
      category: 'Commercial Rights',
      question: 'What usage rights and copyright permissions are included?',
      answer:
        'All client collections include full personal printing, sharing, and digital reproduction rights for life. For commercial and brand campaigns (Fashion & Commercial packages), worldwide digital and print advertising usage licenses are included as standard in your contract.',
    },
    {
      category: 'Travel & Destination',
      question: 'Do you travel for destination weddings, fashion tours, and outdoor shoots?',
      answer:
        'Absolutely. Our team regularly photographs across India (Udaipur, Jaipur, Goa, Kerala, Ladakh) and international destinations (Paris, Dubai, Como). Travel logistics and accommodation are transparently factored at flat cost without hidden markups.',
    },
    {
      category: 'Heirloom Albums',
      question: 'How are your physical heirloom albums crafted?',
      answer:
        'Our flush-mount albums are handcrafted in Florence and New Delhi using full-grain Italian leather, Japanese silk, or archival linen. Pages are printed on thick museum-grade 310gsm cotton-rag fine-art paper using pigment inks that resist fading for over 100 years.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#F8FAFC] border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-4">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span>CLIENT FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#090D16] tracking-tight mb-4">
            Everything You Need to Know{' '}
            <span className="font-serif-luxury italic font-normal text-blue-600">Before Your Shoot</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Clear, transparent answers regarding scheduling, creative direction, turnaround times, and delivery standards.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'bg-white shadow-lg border-blue-500/30'
                    : 'bg-white/80 hover:bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-mono-accents font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 block mb-1">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#090D16]">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#090D16] text-base sm:text-lg">Have a bespoke or destination inquiry?</h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Our creative directors are happy to answer specific queries over a rapid 10-minute call or WhatsApp.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl bg-[#090D16] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
          >
            Direct Inquiry Form
          </a>
        </div>

      </div>
    </section>
  );
};

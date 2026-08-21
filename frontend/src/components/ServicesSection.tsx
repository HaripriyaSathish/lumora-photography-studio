import React from 'react';
import {
  HeartHandshake,
  UserCheck,
  Sparkles,
  CalendarCheck,
  Briefcase,
  Flame,
  Check,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onEnquireService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onEnquireService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-blue-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-indigo-600" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-cyan-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#090D16]" />;
      default:
        return <Flame className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase">
              STUDIO COMMISSIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090D16]">
            BESPOKE PHOTOGRAPHY <span className="font-serif-luxury italic font-normal text-blue-600">SERVICES.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            From intimate private commissions to multinational advertising campaigns, we deploy specialized medium-format gear and master color science.
          </p>
        </div>

        {/* 6 Services Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Service Hero Image */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D16]/80 via-[#090D16]/20 to-transparent" />
                
                {/* Starting Price Pill */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[#090D16] text-xs font-extrabold shadow-md border border-slate-100 flex items-center gap-1.5">
                  <span className="text-slate-500 font-normal">Starting from</span>
                  <span className="text-blue-600 text-sm font-black">{service.startingPrice}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {getIcon(service.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#090D16] group-hover:text-blue-600 transition-colors font-serif-luxury italic text-2xl">
                        {service.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-6">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2.5 mb-8">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enquire Button */}
                <button
                  id={`btn-enquire-${service.id}`}
                  onClick={() => onEnquireService(service.title)}
                  className="w-full py-3.5 rounded-xl bg-slate-100 hover:bg-blue-600 text-[#090D16] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group-hover:bg-[#090D16] group-hover:text-white"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>COMMISSION INQUIRY</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

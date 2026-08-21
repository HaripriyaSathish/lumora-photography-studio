import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onBookSession: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookSession }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active underline
      const sections = ['home', 'about', 'process', 'portfolio', 'services', 'packages', 'why-us', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Packages', href: '#packages', id: 'packages' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav-light py-3.5 shadow-sm border-b border-slate-200/80 bg-white/90 backdrop-blur-md'
          : 'bg-white/95 py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="brand-logo-link"
          href="#home"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#090D16] text-white flex items-center justify-center shadow-md group-hover:bg-blue-600 transition-colors duration-300">
            <Camera className="w-5 h-5 text-teal-400 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-[#090D16] leading-none flex items-center gap-1">
              LUMORA
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600" />
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-slate-500 uppercase mt-0.5">
              HAUTE PHOTOGRAPHY
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                className={`relative px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full transition-all duration-300" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Primary CTA: Book Session */}
          <button
            id="btn-nav-book-session"
            onClick={onBookSession}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span>Reserve Date</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="btn-toggle-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-200 shadow-2xl px-6 py-6 transition-all animate-in slide-in-from-top-2"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-bold transition-colors ${
                  activeSection === link.id ? 'text-blue-600' : 'text-slate-900 hover:text-blue-600'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookSession();
                }}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wider uppercase shadow-md flex items-center justify-center gap-2"
              >
                <span>Reserve Your Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
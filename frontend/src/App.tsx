import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FloatingContactButtons } from './components/FloatingContactButtons';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { CategoriesSection } from './components/CategoriesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import {
  Category,
  GalleryImage,
  Service,
  Package,
  Testimonial,
  ContactEnquiry,
} from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_GALLERY,
  INITIAL_SERVICES,
  INITIAL_PACKAGES,
  INITIAL_TESTIMONIALS,
} from './data/initialData';

export default function App() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(INITIAL_GALLERY);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [selectedPackageName, setSelectedPackageName] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchAllData = async () => {
    try {
      const [catRes, galRes, srvRes, pkgRes, testRes] = await Promise.allSettled([
        fetch('/api/categories/'),
        fetch('/api/gallery/'),
        fetch('/api/services/'),
        fetch('/api/packages/'),
        fetch('/api/testimonials/'),
      ]);

      if (catRes.status === 'fulfilled' && catRes.value.ok) {
        const catData = await catRes.value.json();
        if (Array.isArray(catData) && catData.length > 0) setCategories(catData);
      }

      if (galRes.status === 'fulfilled' && galRes.value.ok) {
        const galData = await galRes.value.json();
        if (Array.isArray(galData) && galData.length > 0) setGalleryImages(galData);
      }

      if (srvRes.status === 'fulfilled' && srvRes.value.ok) {
        const srvData = await srvRes.value.json();
        if (Array.isArray(srvData) && srvData.length > 0) setServices(srvData);
      }

      if (pkgRes.status === 'fulfilled' && pkgRes.value.ok) {
        const pkgData = await pkgRes.value.json();
        if (Array.isArray(pkgData) && pkgData.length > 0) setPackages(pkgData);
      }

      if (testRes.status === 'fulfilled' && testRes.value.ok) {
        const testData = await testRes.value.json();
        if (Array.isArray(testData) && testData.length > 0) setTestimonials(testData);
      }
    } catch (err) {
      console.warn('Initial data loaded as fallback:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategorySlug(slug);
    scrollToSection('portfolio');
  };

  const handleEnquireService = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    setSelectedPackageName('');
    scrollToSection('contact');
    addToast('info', 'Service Selected', `Custom quote mode enabled for ${serviceTitle}. Complete the enquiry form below.`);
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackageName(pkg.name);
    setSelectedServiceTitle('');
    scrollToSection('contact');
    addToast('info', 'Package Selected', `${pkg.name} package chosen (${pkg.price}). Please select your preferred date.`);
  };

  const handleEnquirySuccess = (enquiry: ContactEnquiry) => {
    addToast(
      'success',
      'Enquiry Dispatched!',
      `Thank you ${enquiry.fullName}! A confirmation receipt has been dispatched to ${enquiry.email}.`
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#090D16] selection:bg-blue-600 selection:text-white relative font-sans antialiased">
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Sticky Navigation */}
      <Navbar
        onBookSession={() => scrollToSection('contact')}
      />

      {/* Floating Action Buttons */}
      <FloatingContactButtons onQuickBookClick={() => scrollToSection('contact')} />

      <main>
        {/* 1. Hero Section */}
        <Hero
          onViewPortfolio={() => scrollToSection('portfolio')}
          onBookSession={() => scrollToSection('contact')}
        />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Creative Workflow */}
        <ProcessSection onBookSession={() => scrollToSection('contact')} />

        {/* 4. Disciplines */}
        <CategoriesSection
          categories={categories}
          onSelectCategory={handleSelectCategory}
        />

        {/* 5. Dynamic Masonry Portfolio Atelier with Lightbox */}
        <PortfolioGallery
          galleryImages={galleryImages}
          selectedCategorySlug={selectedCategorySlug}
          onBookSession={() => scrollToSection('contact')}
        />

        {/* 6. Bespoke Services Section */}
        <ServicesSection
          services={services}
          onEnquireService={handleEnquireService}
        />

        {/* 7. Investment Packages Section */}
        <PackagesSection
          packages={packages}
          onSelectPackage={handleSelectPackage}
        />

        {/* 8. Why Choose Us */}
        <WhyChooseUs />

        {/* 9. Client Praise & Testimonials Carousel */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 10. FAQ Section */}
        <FaqSection />

        {/* 11. Visual CTA Banner */}
        <CtaBanner onBookSession={() => scrollToSection('contact')} />

        {/* 12. Interactive Booking Enquiry Form */}
        <ContactSection
          initialType={selectedServiceTitle}
          initialPackage={selectedPackageName}
          onEnquirySuccess={handleEnquirySuccess}
        />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
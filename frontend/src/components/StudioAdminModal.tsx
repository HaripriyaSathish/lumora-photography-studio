import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Image,
  Inbox,
  Code2,
  Plus,
  Trash2,
  Star,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Server
} from 'lucide-react';
import { GalleryImage, ContactEnquiry, DjangoAdminStats } from '../types';

interface StudioAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  galleryImages: GalleryImage[];
  onRefreshGallery: () => void;
}

export const StudioAdminModal: React.FC<StudioAdminModalProps> = ({
  isOpen,
  onClose,
  galleryImages,
  onRefreshGallery,
}) => {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'gallery' | 'api' | 'code'>('enquiries');
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [stats, setStats] = useState<DjangoAdminStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // New Image Form State
  const [newImage, setNewImage] = useState({
    title: '',
    category: 'wedding',
    description: '',
    cloudinaryPublicId: '',
    imageUrl: '',
    aspectRatio: 'portrait' as 'portrait' | 'landscape' | 'square',
    isFeatured: false,
    clientName: '',
    location: '',
  });

  const fetchEnquiriesAndStats = async () => {
    try {
      setLoading(true);
      const [enqRes, statsRes] = await Promise.all([
        fetch('/api/enquiries/'),
        fetch('/api/django-admin/stats/'),
      ]);

      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEnquiriesAndStats();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus as any } : e))
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleToggleFeatured = async (image: GalleryImage) => {
    try {
      const res = await fetch(`/api/gallery/${image.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !image.isFeatured }),
      });
      if (res.ok) {
        onRefreshGallery();
      }
    } catch (err) {
      console.error('Failed to toggle featured status', err);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to remove this image from the gallery?')) return;
    try {
      const res = await fetch(`/api/gallery/${imageId}/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        onRefreshGallery();
      }
    } catch (err) {
      console.error('Failed to delete image', err);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.title || !newImage.imageUrl) return;

    try {
      const res = await fetch('/api/gallery/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage),
      });

      if (res.ok) {
        onRefreshGallery();
        setNewImage({
          title: '',
          category: 'wedding',
          description: '',
          cloudinaryPublicId: '',
          imageUrl: '',
          aspectRatio: 'portrait',
          isFeatured: false,
          clientName: '',
          location: '',
        });
      }
    } catch (err) {
      console.error('Failed to add image', err);
    }
  };

  return (
    <div
      id="studio-admin-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/80 backdrop-blur-md p-4 sm:p-6"
    >
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#101828] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2563EB] text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold tracking-tight text-white">
                  LUMORA Django Admin & REST Center
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  DRF v3.15 • PostgreSQL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage enquiries, Cloudinary gallery media, API endpoints, and view Django backend schemas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close admin modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-white text-[#FF5A36] border-t-2 border-[#FF5A36] shadow-xs'
                : 'text-slate-600 hover:text-[#101828]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-white text-[#FF5A36] border-t-2 border-[#FF5A36] shadow-xs'
                : 'text-slate-600 hover:text-[#101828]'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Gallery Media ({galleryImages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'api'
                ? 'bg-white text-[#FF5A36] border-t-2 border-[#FF5A36] shadow-xs'
                : 'text-slate-600 hover:text-[#101828]'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>DRF Endpoints</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-white text-[#FF5A36] border-t-2 border-[#FF5A36] shadow-xs'
                : 'text-slate-600 hover:text-[#101828]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Django Source Code</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Enquiries */}
          {activeTab === 'enquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-extrabold text-[#101828] uppercase tracking-wider">
                  Client Session Booking Requests
                </h4>
                <button
                  onClick={fetchEnquiriesAndStats}
                  className="text-xs font-bold text-[#2563EB] hover:underline"
                >
                  Refresh Enquiries
                </button>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-sm">
                  No enquiries recorded yet. Test the booking form on the landing page!
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col gap-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-extrabold text-[#101828]">
                              {enq.fullName}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FF5A36]/10 text-[#FF5A36] text-[11px] font-bold">
                              {enq.photographyType}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              {enq.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {enq.phone}
                            </span>
                            {enq.preferredDate && (
                              <span className="flex items-center gap-1 font-mono">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                {enq.preferredDate}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Status Selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">Status:</span>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border outline-none cursor-pointer ${
                              enq.status === 'booked'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : enq.status === 'contacted'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : enq.status === 'archived'
                                ? 'bg-slate-200 text-slate-700 border-slate-300'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="pending">Pending Review</option>
                            <option value="contacted">Contacted Client</option>
                            <option value="booked">Session Booked</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>
                      </div>

                      {/* Vision Details & Budget */}
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
                        <strong className="text-[#101828]">Budget:</strong> {enq.budget} |{' '}
                        <strong className="text-[#101828]">Location:</strong> {enq.location || 'Not specified'}
                        <p className="mt-1.5 text-slate-600">"{enq.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Gallery Media Manager */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Cloudinary Image Form */}
              <form onSubmit={handleAddImage} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-extrabold text-[#101828] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#FF5A36]" />
                  <span>Add New Cloudinary Photograph to Django Gallery</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Image Title (e.g. Royal Twilight Pheras)"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#FF5A36]"
                  />

                  <select
                    value={newImage.category}
                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none cursor-pointer"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="portrait">Portrait</option>
                    <option value="fashion">Fashion</option>
                    <option value="event">Event</option>
                    <option value="couples">Couples</option>
                    <option value="commercial">Commercial</option>
                    <option value="travel">Travel</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>

                  <select
                    value={newImage.aspectRatio}
                    onChange={(e) => setNewImage({ ...newImage, aspectRatio: e.target.value as any })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none cursor-pointer"
                  >
                    <option value="portrait">Portrait (Tall)</option>
                    <option value="landscape">Landscape (Wide)</option>
                    <option value="square">Square</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  <input
                    type="url"
                    required
                    placeholder="Image URL (Cloudinary / CDN URL)"
                    value={newImage.imageUrl}
                    onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none focus:border-[#FF5A36]"
                  />

                  <input
                    type="text"
                    placeholder="Cloudinary Public ID (e.g. lumora/weddings/01)"
                    value={newImage.cloudinaryPublicId}
                    onChange={(e) => setNewImage({ ...newImage, cloudinaryPublicId: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white outline-none"
                  />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newImage.isFeatured}
                      onChange={(e) => setNewImage({ ...newImage, isFeatured: e.target.checked })}
                      className="rounded text-[#FF5A36]"
                    />
                    <span>⭐ Mark as Featured on Landing Page</span>
                  </label>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#FF5A36] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#ff451d] shadow-md cursor-pointer"
                  >
                    Publish to Gallery
                  </button>
                </div>
              </form>

              {/* Gallery Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="p-3 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between gap-3 shadow-xs"
                  >
                    <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                      <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#101828]/80 text-white text-[10px] font-bold uppercase">
                        {img.category}
                      </span>
                      {img.isFeatured && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#FF5A36] text-white text-[10px] font-bold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <h5 className="text-xs font-extrabold text-[#101828] truncate">{img.title}</h5>
                      <p className="text-[10px] text-slate-500 truncate font-mono">
                        {img.cloudinaryPublicId}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleToggleFeatured(img)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                          img.isFeatured
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {img.isFeatured ? 'Featured ⭐' : 'Make Featured'}
                      </button>

                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DRF Endpoints Tester */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <h4 className="text-sm font-extrabold text-[#101828] uppercase tracking-wider">
                Live Django REST API Endpoints
              </h4>
              <p className="text-xs text-slate-600">
                These endpoints conform to Django REST Framework JSON serialization standards.
              </p>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { method: 'GET', url: '/api/gallery/', desc: 'Retrieve full gallery or filter by ?category=wedding' },
                  { method: 'GET', url: '/api/gallery/featured/', desc: 'Retrieve curated featured landing page images' },
                  { method: 'GET', url: '/api/categories/', desc: 'List of all photography disciplines' },
                  { method: 'GET', url: '/api/services/', desc: 'List of bespoke studio services & starting pricing' },
                  { method: 'GET', url: '/api/packages/', desc: 'List of investment tiers (Essential, Signature, Luxury)' },
                  { method: 'GET', url: '/api/testimonials/', desc: 'List of approved client praise reviews' },
                  { method: 'POST', url: '/api/enquiries/', desc: 'Submit booking enquiry & trigger email dispatch' },
                ].map((ep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 text-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ep.method === 'GET' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="text-[#FFD23F]">{ep.url}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Django Backend Code */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-[#101828] uppercase tracking-wider">
                    Django & DRF Python Architecture
                  </h4>
                  <p className="text-xs text-slate-500">
                    Production models, serializers, and views located in /django_backend/
                  </p>
                </div>

                <div className="text-xs font-mono text-emerald-600 font-bold">
                  ✓ PostgreSQL & Cloudinary Ready
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-[50vh]">
                <pre>{`# django_backend/models.py
from django.db import models

class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    cloudinary_public_id = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500)
    aspect_ratio = models.CharField(max_length=20, default='portrait')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class ContactEnquiry(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=25)
    photography_type = models.CharField(max_length=100)
    preferred_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default='pending')
    email_notification_sent = models.BooleanField(default=False)`}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
          <div>Connected to Django REST Server • Port 3000</div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#101828] text-white font-bold uppercase tracking-wider hover:bg-slate-800 cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};

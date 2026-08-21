import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { INITIAL_CATEGORIES, INITIAL_GALLERY, INITIAL_SERVICES, INITIAL_PACKAGES, INITIAL_TESTIMONIALS } from './src/data/initialData.js';
import { Category, GalleryImage, Service, Package, Testimonial, ContactEnquiry } from './src/types/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store mimicking Django models with pre-seeded data
let categoriesStore: Category[] = [...INITIAL_CATEGORIES];
let galleryStore: GalleryImage[] = [...INITIAL_GALLERY];
let servicesStore: Service[] = [...INITIAL_SERVICES];
let packagesStore: Package[] = [...INITIAL_PACKAGES];
let testimonialsStore: Testimonial[] = [...INITIAL_TESTIMONIALS];
let enquiriesStore: ContactEnquiry[] = [
  {
    id: 'enq-101',
    fullName: 'Ananya Singhania',
    email: 'ananya.singhania@example.com',
    phone: '+91 98200 12345',
    photographyType: 'Weddings',
    preferredDate: '2026-11-20',
    location: 'Jagmandir Island Palace, Udaipur',
    budget: '₹65,000+ (Luxury)',
    message: 'Looking for 3-day royal wedding photography coverage including candid pheras, cocktail night, and pre-wedding shoot.',
    status: 'booked',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    emailNotificationSent: true,
  },
  {
    id: 'enq-102',
    fullName: 'Vikramaditya Roy',
    email: 'vikram.roy@maisoncouture.in',
    phone: '+91 99301 88776',
    photographyType: 'Fashion',
    preferredDate: '2026-09-15',
    location: 'Studio Lumora / Mumbai',
    budget: '₹35,000 (Signature)',
    message: 'High-concept Autumn/Winter editorial lookbook shoot for our luxury ethnic line. Need model direction and fast turnaround.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    emailNotificationSent: true,
  }
];

// --- Django REST Framework Compatible API Endpoints ---

// 1. Categories
app.get('/api/categories/', (req, res) => {
  res.json(categoriesStore);
});

// 2. Gallery Images (supports ?category= filter)
app.get('/api/gallery/', (req, res) => {
  const { category } = req.query;
  if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
    const filtered = galleryStore.filter(img => img.category.toLowerCase() === category.toLowerCase());
    return res.json(filtered);
  }
  res.json(galleryStore);
});

// 3. Featured Gallery Images
app.get('/api/gallery/featured/', (req, res) => {
  const featured = galleryStore.filter(img => img.isFeatured);
  res.json(featured);
});

// Create new gallery image (Django Admin feature)
app.post('/api/gallery/', (req, res) => {
  const { title, category, description, cloudinaryPublicId, imageUrl, aspectRatio, isFeatured, clientName, location, year } = req.body;
  if (!title || !imageUrl) {
    return res.status(400).json({ error: 'Title and Image URL are required' });
  }

  const newImage: GalleryImage = {
    id: `gal-${Date.now()}`,
    title: title.trim(),
    category: category || 'wedding',
    description: description || '',
    cloudinaryPublicId: cloudinaryPublicId || `lumora/custom_${Date.now()}`,
    imageUrl: imageUrl.trim(),
    aspectRatio: aspectRatio || 'portrait',
    isFeatured: Boolean(isFeatured),
    displayOrder: galleryStore.length + 1,
    clientName: clientName || '',
    location: location || '',
    year: year || '2026',
    createdAt: new Date().toISOString()
  };

  galleryStore.unshift(newImage);
  res.status(201).json(newImage);
});

// Update / Toggle featured status
app.patch('/api/gallery/:id/', (req, res) => {
  const { id } = req.params;
  const imageIndex = galleryStore.findIndex(item => item.id === id);
  if (imageIndex === -1) {
    return res.status(404).json({ error: 'Gallery image not found' });
  }
  galleryStore[imageIndex] = {
    ...galleryStore[imageIndex],
    ...req.body
  };
  res.json(galleryStore[imageIndex]);
});

// Delete gallery image
app.delete('/api/gallery/:id/', (req, res) => {
  const { id } = req.params;
  galleryStore = galleryStore.filter(item => item.id !== id);
  res.status(204).send();
});

// 4. Services
app.get('/api/services/', (req, res) => {
  res.json(servicesStore);
});

// 5. Packages
app.get('/api/packages/', (req, res) => {
  res.json(packagesStore);
});

// 6. Testimonials
app.get('/api/testimonials/', (req, res) => {
  res.json(testimonialsStore);
});

// 7. Contact Enquiries
app.get('/api/enquiries/', (req, res) => {
  res.json(enquiriesStore);
});

app.post('/api/enquiries/', (req, res) => {
  const { fullName, email, phone, photographyType, preferredDate, location, budget, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Please provide name, email, phone, and your message vision.' });
  }

  // Basic email validation
  if (!email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const newEnquiry: ContactEnquiry = {
    id: `enq-${Date.now()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    photographyType: photographyType || 'General Enquiry',
    preferredDate: preferredDate || '',
    location: location || '',
    budget: budget || 'Standard rate',
    message: message.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
    emailNotificationSent: true
  };

  enquiriesStore.unshift(newEnquiry);

  // Simulated Django send_mail log output
  console.log(`[DJANGO EMAIL DISPATCH] Notification to studio: New enquiry from ${newEnquiry.fullName} for ${newEnquiry.photographyType}`);
  console.log(`[DJANGO EMAIL DISPATCH] Confirmation to client: Sent to ${newEnquiry.email}`);

  res.status(201).json({
    success: true,
    message: 'Your photography enquiry has been received! Our creative director will reach out within 24 hours.',
    data: newEnquiry
  });
});

// Update enquiry status
app.patch('/api/enquiries/:id/', (req, res) => {
  const { id } = req.params;
  const enquiryIndex = enquiriesStore.findIndex(item => item.id === id);
  if (enquiryIndex === -1) {
    return res.status(404).json({ error: 'Enquiry not found' });
  }

  enquiriesStore[enquiryIndex] = {
    ...enquiriesStore[enquiryIndex],
    ...req.body
  };
  res.json(enquiriesStore[enquiryIndex]);
});

// 8. Django Admin Stats API
app.get('/api/django-admin/stats/', (req, res) => {
  res.json({
    totalEnquiries: enquiriesStore.length,
    pendingEnquiries: enquiriesStore.filter(e => e.status === 'pending').length,
    totalGalleryImages: galleryStore.length,
    featuredImages: galleryStore.filter(g => g.isFeatured).length,
    totalServices: servicesStore.length,
    totalPackages: packagesStore.length
  });
});

// Vite dev server or static files setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ LUMORA Studio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

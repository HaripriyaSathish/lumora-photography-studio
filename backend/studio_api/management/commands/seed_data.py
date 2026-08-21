from django.core.management.base import BaseCommand
from studio_api.models import Category, GalleryImage, Service, Package, Testimonial

class Command(BaseCommand):
    help = 'Seeds initial studio categories, services, packages, gallery images, and testimonials.'

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding database...")

        # 1. Seed Categories
        categories_data = [
            {'name': 'Weddings', 'slug': 'wedding', 'description': 'Emotional storytelling, timeless rituals, and candid romantic glances captured with cinematic elegance.', 'cover_image': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=85&w=1200', 'display_order': 1},
            {'name': 'Portraits', 'slug': 'portrait', 'description': 'Striking individual, executive, and artist portraits defined by expressive natural lighting and character.', 'cover_image': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200', 'display_order': 2},
            {'name': 'Fashion', 'slug': 'fashion', 'description': 'Bold editorial and high-concept fashion narratives crafted for luxury brands and modern publications.', 'cover_image': 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1200', 'display_order': 3},
            {'name': 'Events', 'slug': 'event', 'description': 'High-energy corporate galas, private celebrations, and cultural festivals documented with precision.', 'cover_image': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1200', 'display_order': 4},
            {'name': 'Couples', 'slug': 'couples', 'description': 'Intimate pre-wedding adventures, engagements, and authentic romance in scenic outdoor backdrops.', 'cover_image': 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=85&w=1200', 'display_order': 5},
            {'name': 'Commercial', 'slug': 'commercial', 'description': 'Dynamic product, architectural, and brand campaign imagery engineered to elevate market presence.', 'cover_image': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=85&w=1200', 'display_order': 6},
        ]

        category_objs = {}
        for cat in categories_data:
            obj, _ = Category.objects.get_or_create(
                slug=cat['slug'],
                defaults=cat
            )
            category_objs[cat['slug']] = obj

        # 2. Seed Services (Safe field mapping)
        services_data = [
            {
                'title': 'Wedding Photography',
                'subtitle': 'Emotional Storytelling & Grand Traditions',
                'description': 'Complete visual narrative from intimate pre-wedding rituals to breathtaking pheras and reception celebrations.',
                'starting_price': '₹45,000',
                'image_url': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1000',
                'features': 'Multi-angle candid & traditional coverage\nDual master photographers + drone aerials\nArtisan leather album + online 4K gallery\nColor-graded highlight reel & teasers'
            },
            {
                'title': 'Portrait Photography',
                'subtitle': 'Personality, Character & Presence',
                'description': 'Studio and outdoor portrait sessions designed for leaders, artists, actors, and personal branding.',
                'starting_price': '₹12,000',
                'image_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1000',
                'features': 'Tailored lighting setups & creative moodboards\nOn-site hair and makeup styling assistance\nHigh-end magazine retouching\nInstant raw image review on tethered monitors'
            },
            {
                'title': 'Fashion Photography',
                'subtitle': 'Bold Editorial & Lookbook Campaigns',
                'description': 'High-concept fashion shoots for designer collections, luxury apparel, lookbooks, and magazine features.',
                'starting_price': '₹30,000',
                'image_url': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1000',
                'features': 'Comprehensive creative direction & location scouting\nCommercial licensing for print & digital billboard use\nModel casting & wardrobe styling collaboration\nNext-day editorial batch delivery'
            },
            {
                'title': 'Event Photography',
                'subtitle': 'Keynotes, Galas & Concert Energy',
                'description': 'Unobtrusive, fast-paced documentation of corporate conferences, grand inaugurations, and music festivals.',
                'starting_price': '₹20,000',
                'image_url': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=85&w=1000',
                'features': 'Real-time press upload for same-day PR releases\nMulti-stage concurrent documentation\nLow-light prime optics without harsh flashes\nFull uncompressed high-res archive'
            }
        ]

        # Inspect Service model fields to only pass existing columns
        service_field_names = {f.name for f in Service._meta.get_fields()}

        for srv in services_data:
            clean_srv = {k: v for k, v in srv.items() if k in service_field_names}
            Service.objects.get_or_create(
                title=srv['title'],
                defaults=clean_srv
            )

        # 3. Seed Packages
        packages_data = [
            {
                'name': 'Essential',
                'tagline': 'Ideal for intimate sessions, portraits, and mini celebrations',
                'price': '₹15,000',
                'is_popular': False,
                'duration': '3 to 4 Hours of Coverage',
                'edited_photos': '50+ Master Retouched Photos',
                'deliverables': '1 Lead Senior Photographer\n1 Curated Outdoor or Studio Location\nPrivate High-Resolution Online Gallery\nFull Digital Download Rights\nColor-Graded & Retouched Masters\nDelivery within 7 Business Days'
            },
            {
                'name': 'Signature',
                'tagline': 'Our most sought-after choice for weddings, brands & fashion lookbooks',
                'price': '₹35,000',
                'is_popular': True,
                'badge': 'MOST POPULAR',
                'duration': 'Full Day Coverage (8–10 Hours)',
                'edited_photos': '200+ Master Retouched Photos',
                'deliverables': '2 Master Photographers (Candid + Traditional)\nMultiple Location Changes & Wardrobes\n1 Premium 30-Page Handcrafted Hardcover Album\nCinematic 60-Second Social Reel / Teaser\nPrivate 4K Client Cloud Gallery (Lifetime Access)\nExpedited 48-Hour Preview Batch\nDelivery within 14 Business Days'
            },
            {
                'name': 'Luxury',
                'tagline': 'The ultimate bespoke experience for grand weddings & enterprise campaigns',
                'price': '₹65,000',
                'is_popular': False,
                'duration': 'Multi-Day / Unlimited Hours Coverage',
                'edited_photos': '500+ Master Retouched Photos',
                'deliverables': '3 Master Photographers + Dedicated Aerial Drone Pilot\nPre-Event Consultation & Custom Moodboard Direction\n2 Deluxe Heirloom Italian Leather Albums + Parent Minis\n3 Cinematic 4K Video Reels + Full Highlight Film\nVIP Priority Retouching (7-Day Complete Delivery)\nCustom Engraved Crystal USB Presentation Box\nFull Worldwide Commercial & Archival Rights'
            }
        ]

        package_field_names = {f.name for f in Package._meta.get_fields()}

        for pkg in packages_data:
            clean_pkg = {k: v for k, v in pkg.items() if k in package_field_names}
            Package.objects.get_or_create(
                name=pkg['name'],
                defaults=clean_pkg
            )

        # 4. Seed Gallery Images
        gallery_data = [
            {'title': 'The Royal Heritage Nuptials', 'image_url': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=1200', 'is_featured': True, 'client_name': 'Aanya & Siddharth', 'location': 'Udaipur, Rajasthan', 'year': '2026'},
            {'title': 'Vogue Chroma Editorial', 'image_url': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1200', 'is_featured': True, 'client_name': 'Maison Eclat Paris', 'location': 'Studio Lumora 01', 'year': '2026'},
            {'title': 'Soul & Silhouette Portrait', 'image_url': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200', 'is_featured': True, 'client_name': 'Elena Rostova', 'location': 'Mumbai Art District', 'year': '2026'},
            {'title': 'Minimalist Horology Campaign', 'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=85&w=1200', 'is_featured': True, 'client_name': 'Vanguard Chronometers', 'location': 'Lumora Macro Lab', 'year': '2026'},
            {'title': 'Twilight Coastal Romance', 'image_url': 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=85&w=1200', 'is_featured': True, 'client_name': 'Rhea & Kabir', 'location': 'Goa Coastal Cliffs', 'year': '2026'}
        ]

        gallery_field_names = {f.name for f in GalleryImage._meta.get_fields()}

        for gal in gallery_data:
            clean_gal = {k: v for k, v in gal.items() if k in gallery_field_names}
            GalleryImage.objects.get_or_create(
                title=gal['title'],
                defaults=clean_gal
            )

        # 5. Seed Testimonials
        testimonials_data = [
            {
                'client_name': 'Aanya & Siddharth Mehta',
                'category': 'Udaipur Royal Wedding',
                'event_date': 'January 2026',
                'location': 'Rajasthan, India',
                'rating': 5,
                'quote': 'Every single photograph feels like a memory we can step back into. LUMORA didn’t just document our wedding; they captured the unspoken emotions, tears, and joy with breathtaking artistry.',
                'client_avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                'featured_photo_url': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=85&w=800'
            },
            {
                'client_name': 'Rohan Deshmukh',
                'category': 'Creative Director, Maison Eclat',
                'event_date': 'February 2026',
                'location': 'Mumbai, India',
                'rating': 5,
                'quote': 'Working with the LUMORA studio team was an absolute masterclass. Their command of lighting, promptness on set, and rapid delivery of editorial-ready masters exceeded all our brand expectations.',
                'client_avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
                'featured_photo_url': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=800'
            }
        ]

        test_field_names = {f.name for f in Testimonial._meta.get_fields()}

        for test in testimonials_data:
            clean_test = {k: v for k, v in test.items() if k in test_field_names}
            Testimonial.objects.get_or_create(
                client_name=test['client_name'],
                defaults=clean_test
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded all initial data!'))
"""
Database Seeder for LUMORA Haute Photography Studio.
Populates SQLite/PostgreSQL database with initial curated masterworks, categories, packages, and services.
Run via: python seed.py
"""
import os
import sys
import django

# Setup Django Environment
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lumora_studio.settings')
django.setup()

from studio_api.models import Category, GalleryImage, Service, Package, Testimonial

def seed_database():
    print("🌱 Seeding LUMORA Studio database...")

    # 1. Categories
    categories_data = [
        {
            "name": "Weddings & Galas",
            "slug": "wedding",
            "description": "Bespoke destination, royal heritage, and intimate editorial nuptials.",
            "cover_image": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
            "display_order": 1,
        },
        {
            "name": "Fine-Art Portraits",
            "slug": "portrait",
            "description": "Executive presence, auteur profiles, and high-key character studies.",
            "cover_image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
            "display_order": 2,
        },
        {
            "name": "High Fashion & Lookbooks",
            "slug": "fashion",
            "description": "Avant-garde runway, haute couture campaigns, and agency lookbooks.",
            "cover_image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
            "display_order": 3,
        },
        {
            "name": "Events & Galas",
            "slug": "event",
            "description": "Global summit galas, brand launches, and private celebrity celebrations.",
            "cover_image": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
            "display_order": 4,
        },
        {
            "name": "Commercial & Campaigns",
            "slug": "commercial",
            "description": "Architectural spaces, luxury goods, and global brand advertisements.",
            "cover_image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
            "display_order": 5,
        },
    ]

    cat_map = {}
    for cat_data in categories_data:
        cat, _ = Category.objects.update_or_create(
            slug=cat_data["slug"],
            defaults=cat_data
        )
        cat_map[cat.slug] = cat
        print(f"  ✓ Category: {cat.name}")

    # 2. Packages
    packages_data = [
        {
            "name": "Essential",
            "tagline": "Private commissions, auteur portraits & intimate celebrations.",
            "price": "₹15,000",
            "numeric_price": 15000.00,
            "is_popular": False,
            "duration": "2 - 3 Hours Studio/Location",
            "edited_photos": "35 Fine-Art Retouched",
            "deliverables": [
                "2 Locations / Studio Sets",
                "35 High-Resolution Retouched Masters",
                "Private 4K Online Viewing Gallery",
                "48-Hour Social Preview Batch",
                "Full Personal Usage Rights"
            ],
            "accent_color": "#2563EB",
            "display_order": 1
        },
        {
            "name": "Signature Collection",
            "tagline": "Full-day royal weddings, brand lookbooks & creative direction.",
            "price": "₹35,000",
            "numeric_price": 35000.00,
            "is_popular": True,
            "badge": "MOST POPULAR",
            "duration": "6 - 8 Hours Full Coverage",
            "edited_photos": "100+ Master Retouched",
            "deliverables": [
                "Lead Master Photographer + Associate",
                "100+ Fine-Art Color Graded Masters",
                "Handcrafted Italian Linen 12x12 Album",
                "Hasselblad Medium-Format Precision",
                "48-Hour Curated Highlight Reel",
                "Unrestricted Commercial & Personal Rights"
            ],
            "accent_color": "#0D9488",
            "display_order": 2
        },
        {
            "name": "Haute Luxury",
            "tagline": "Multi-day destination weddings & global advertising campaigns.",
            "price": "₹65,000",
            "numeric_price": 65000.00,
            "is_popular": False,
            "badge": "ULTRA LUXURY",
            "duration": "Multi-Day Full Production",
            "edited_photos": "250+ Master Color Graded",
            "deliverables": [
                "Master Director + Full 3-Camera Crew",
                "250+ Master Color Graded Files + RAWs",
                "2 Bespoke Handcrafted Leather Albums",
                "Aerial FPV Drone & Medium-Format 100MP",
                "Bespoke Wooden Collector Box & USB",
                "Priority 72-Hour Express Turnaround"
            ],
            "accent_color": "#4F46E5",
            "display_order": 3
        }
    ]

    for pkg_data in packages_data:
        pkg, _ = Package.objects.update_or_create(
            name=pkg_data["name"],
            defaults=pkg_data
        )
        print(f"  ✓ Package: {pkg.name}")

    print("✨ Database seeding complete!")

if __name__ == '__main__':
    seed_database()

"""
Serializers for LUMORA Studio API
"""
from rest_framework import serializers
from .models import Category, GalleryImage, Service, Package, Testimonial, ContactEnquiry


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'cover_image', 'display_order']


class GalleryImageSerializer(serializers.ModelSerializer):
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = GalleryImage
        fields = [
            'id', 'title', 'category', 'category_slug', 'category_name',
            'description', 'cloudinary_public_id', 'image_url', 'aspect_ratio',
            'is_featured', 'display_order', 'client_name', 'location', 'year', 'created_at'
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'subtitle', 'description', 'starting_price',
            'numeric_price', 'image_url', 'icon_name', 'features'
        ]


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = [
            'id', 'name', 'tagline', 'price', 'numeric_price',
            'is_popular', 'badge', 'duration', 'edited_photos',
            'deliverables', 'accent_color'
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'category', 'event_date', 'location',
            'rating', 'quote', 'client_avatar', 'featured_photo_url'
        ]


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = [
            'id', 'full_name', 'email', 'phone', 'photography_type',
            'preferred_date', 'location', 'budget', 'message',
            'status', 'email_notification_sent', 'created_at'
        ]
        read_only_fields = ['id', 'status', 'email_notification_sent', 'created_at']

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value.lower().strip()

    def validate_phone(self, value):
        cleaned = ''.join(c for c in value if c.isdigit() or c == '+')
        if len(cleaned) < 8:
            raise serializers.ValidationError("Please provide a valid contact phone number.")
        return cleaned

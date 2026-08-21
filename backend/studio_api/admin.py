"""
Django Admin Customization for LUMORA Studio
"""
from django.contrib import admin
from .models import Category, GalleryImage, Service, Package, Testimonial, ContactEnquiry


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'display_order', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'aspect_ratio', 'is_featured', 'display_order', 'year')
    list_filter = ('category', 'aspect_ratio', 'is_featured', 'year')
    search_fields = ('title', 'description', 'client_name', 'location')
    list_editable = ('is_featured', 'display_order')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'starting_price', 'numeric_price', 'icon_name', 'is_active')
    list_filter = ('is_active', 'category')
    search_fields = ('title', 'subtitle', 'description')
    list_editable = ('is_active',)


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'numeric_price', 'is_popular', 'duration', 'display_order')
    list_editable = ('is_popular', 'display_order')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'category', 'rating', 'event_date', 'location', 'is_approved')
    list_filter = ('rating', 'is_approved', 'category')
    search_fields = ('client_name', 'quote', 'location')
    list_editable = ('is_approved',)


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'photography_type', 'preferred_date', 'budget', 'status', 'created_at')
    list_filter = ('status', 'photography_type', 'created_at')
    search_fields = ('full_name', 'email', 'phone', 'location', 'message')
    list_editable = ('status',)
    readonly_fields = ('created_at', 'email_notification_sent')

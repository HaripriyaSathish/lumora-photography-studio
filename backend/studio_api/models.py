"""
Django Models for LUMORA Haute Photography Studio
"""
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    cover_image = models.URLField(max_length=500, help_text="Cover Image URL")
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    ASPECT_RATIOS = (
        ('portrait', 'Portrait'),
        ('landscape', 'Landscape'),
        ('square', 'Square'),
    )

    title = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='gallery_images')
    description = models.TextField(blank=True)
    cloudinary_public_id = models.CharField(max_length=255, blank=True, help_text="Cloudinary asset ID or key")
    image_url = models.URLField(max_length=500, help_text="High-resolution image URL")
    aspect_ratio = models.CharField(max_length=20, choices=ASPECT_RATIOS, default='portrait')
    is_featured = models.BooleanField(default=False, db_index=True)
    display_order = models.PositiveIntegerField(default=0)
    client_name = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)
    year = models.CharField(max_length=10, default='2026')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.category.name})"


class Service(models.Model):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=255)
    description = models.TextField()
    starting_price = models.CharField(max_length=50, help_text="e.g. ₹45,000")
    numeric_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    image_url = models.URLField(max_length=500)
    icon_name = models.CharField(max_length=50, default="Sparkles")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    features = models.JSONField(default=list, help_text="List of bullet points")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Package(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    price = models.CharField(max_length=50, help_text="e.g. ₹35,000")
    numeric_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_popular = models.BooleanField(default=False)
    badge = models.CharField(max_length=50, blank=True, null=True)
    duration = models.CharField(max_length=100)
    edited_photos = models.CharField(max_length=100)
    deliverables = models.JSONField(default=list)
    accent_color = models.CharField(max_length=20, default="#2563EB")
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'numeric_price']

    def __str__(self):
        return f"{self.name} - {self.price}"


class Testimonial(models.Model):
    client_name = models.CharField(max_length=150)
    category = models.CharField(max_length=150)
    event_date = models.CharField(max_length=50)
    location = models.CharField(max_length=150)
    rating = models.PositiveSmallIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    quote = models.TextField()
    client_avatar = models.URLField(max_length=500)
    featured_photo_url = models.URLField(max_length=500, blank=True, null=True)
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client_name} ({self.rating}★)"


class ContactEnquiry(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Review'),
        ('contacted', 'Contacted Client'),
        ('booked', 'Session Booked'),
        ('archived', 'Archived'),
    )

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=25)
    photography_type = models.CharField(max_length=100)
    preferred_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    budget = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    email_notification_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Contact Enquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.photography_type} ({self.status})"

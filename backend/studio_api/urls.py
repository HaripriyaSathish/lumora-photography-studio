"""
URL routing for Studio REST API
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, GalleryImageViewSet, ServiceViewSet,
    PackageViewSet, TestimonialViewSet, ContactEnquiryViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'packages', PackageViewSet, basename='package')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'enquiries', ContactEnquiryViewSet, basename='enquiry')

urlpatterns = [
    path('', include(router.urls)),
]

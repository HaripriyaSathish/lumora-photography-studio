"""
Views for LUMORA Studio REST API
"""
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
from .models import Category, GalleryImage, Service, Package, Testimonial, ContactEnquiry
from .serializers import (
    CategorySerializer, GalleryImageSerializer, ServiceSerializer,
    PackageSerializer, TestimonialSerializer, ContactEnquirySerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer

    def get_queryset(self):
        queryset = GalleryImage.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)

        if category and category != 'all':
            queryset = queryset.filter(category__slug=category)
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)

        return queryset


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.filter(is_approved=True)
    serializer_class = TestimonialSerializer


class ContactEnquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()

        # Send email notification if configured
        try:
            subject = f"✨ New Studio Booking Commission: {enquiry.full_name} ({enquiry.photography_type})"
            message_body = (
                f"New Booking Enquiry Received\n"
                f"-----------------------------------------\n"
                f"Client: {enquiry.full_name}\n"
                f"Email: {enquiry.email}\n"
                f"Phone: {enquiry.phone}\n"
                f"Discipline: {enquiry.photography_type}\n"
                f"Preferred Date: {enquiry.preferred_date or 'To be finalized'}\n"
                f"Location: {enquiry.location or 'Not specified'}\n"
                f"Budget Tier: {enquiry.budget or 'Standard Signature'}\n\n"
                f"Client Note/Vision:\n{enquiry.message}\n"
            )
            
            if hasattr(settings, 'CONTACT_RECEIVER_EMAIL') and settings.CONTACT_RECEIVER_EMAIL:
                send_mail(
                    subject=subject,
                    message=message_body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.CONTACT_RECEIVER_EMAIL],
                    fail_silently=True,
                )
                enquiry.email_notification_sent = True
                enquiry.save(update_fields=['email_notification_sent'])
        except Exception as e:
            # Non-blocking logging
            print(f"Email notification dispatch notice: {e}")

        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Enquiry registered successfully.", "data": serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

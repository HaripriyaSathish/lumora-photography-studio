from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('studio_api.urls')), # Your API routes
    
    # Catch-all: send all frontend route requests to React's index.html
    re_path(r'^.*$', TemplateView.as_view(
        template_name='index.html',
        content_type='text/html'
    )),
]
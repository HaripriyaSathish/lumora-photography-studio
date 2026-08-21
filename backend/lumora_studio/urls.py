import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.http import HttpResponse, FileResponse
from django.conf import settings
from django.views.static import serve

def serve_react_app(request):
    """Serves the React index.html file"""
    dist_dir = getattr(settings, 'FRONTEND_DIST_DIR', os.path.join(settings.BASE_DIR, '..', 'frontend', 'dist'))
    index_file_path = os.path.join(dist_dir, 'index.html')
    
    if os.path.exists(index_file_path):
        return FileResponse(open(index_file_path, 'rb'), content_type='text/html')
    return HttpResponse("Building frontend... please refresh in a moment.", status=200)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('studio_api.urls')),
    
    # Explicitly serve static assets if requested directly
    re_path(r'^assets/(?P<path>.*)$', serve, {
        'document_root': os.path.join(getattr(settings, 'FRONTEND_DIST_DIR', ''), 'assets')
    }),
    
    # Catch-all: send all other page routes to the React SPA index.html
    re_path(r'^(?!api/|admin/|assets/|static/).*$', lambda req: serve_react_app(req)),
]
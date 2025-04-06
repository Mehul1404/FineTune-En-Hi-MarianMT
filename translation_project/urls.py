# translation_project/urls.py

from django.contrib import admin
from django.urls import path, include  # 'include' is necessary to include app-specific URLs
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('translate.urls')),  # Include the translate app's URLs
]

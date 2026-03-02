from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExtrasViewSet

router = DefaultRouter()
router.register('', ExtrasViewSet, basename='extras-viewset')

urlpatterns = router.urls
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitacionViewSet, HabitacionesDisponiblesAPIView

router = DefaultRouter()
router.register('', HabitacionViewSet, basename='habitacion-viewset')

urlpatterns = [   
    path(
        "disponibles/",
        HabitacionesDisponiblesAPIView.as_view(),
        name="habitaciones-disponibles"
    )
] + router.urls
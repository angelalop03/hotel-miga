from django.urls import path
from .views import ReservaSalaListCreateView, ReservaSalaEstadoAPIView

urlpatterns = [
    path("salas/", ReservaSalaListCreateView.as_view(), name="reserva-sala-list-create"),
    path("salas/<int:id>/estado/", ReservaSalaEstadoAPIView.as_view(), name="reserva-sala-estado"),
    # TODO habitaciones
]
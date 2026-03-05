from django.urls import path
from .views import ReservaSalaListCreateView, ReservaSalaEstadoAPIView, ReservaSalaOcupadoAPIView

urlpatterns = [
    path("salas/", ReservaSalaListCreateView.as_view(), name="reserva-sala-list-create"),
    path("salas/estado/<int:id>/", ReservaSalaEstadoAPIView.as_view(), name="reserva-sala-estado"),
    path("salas/ocupado/<int:id_sala>/", ReservaSalaOcupadoAPIView.as_view(), name="reserva-sala-ocupado"),
    # TODO habitaciones
]
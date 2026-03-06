from django.urls import path
from .views import ReservaSalaListCreateView, ReservaSalaEstadoAPIView, ReservaSalaOcupadoAPIView, ReservaHabitacionListCreateView, ReservaHabitacionEstadoAPIView, ReservaHabitacionOcupadoAPIView

urlpatterns = [
    path("salas/", ReservaSalaListCreateView.as_view(), name="reserva-sala-list-create"),
    path("salas/estado/<int:id>/", ReservaSalaEstadoAPIView.as_view(), name="reserva-sala-estado"),
    path("salas/ocupado/<int:id_sala>/", ReservaSalaOcupadoAPIView.as_view(), name="reserva-sala-ocupado"),
    path("habitaciones/", ReservaHabitacionListCreateView.as_view(), name="reserva-habitacion-list-create"),
    path("habitaciones/estado/<int:id>/", ReservaHabitacionEstadoAPIView.as_view(), name="reserva-habitacion-estado"),
    path("habitaciones/ocupado/<int:id_habitacion>/", ReservaHabitacionOcupadoAPIView.as_view(), name="reserva-habitacion-ocupado"),
]
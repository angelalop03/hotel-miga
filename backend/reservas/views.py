from datetime import date

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ReservaHabitacion, ReservaSala
from .serializer import ReservaSalaSerializer, ReservaSalaEstadoSerializer, ReservaSalaOcupadoSerializer, ReservaHabitacionSerializer, ReservaHabitacionEstadoSerializer, ReservaHabitacionOcupadoSerializer          
from sala.models import Sala
from habitacion.models import Habitacion
from django.shortcuts import get_object_or_404

class ReservaSalaListCreateView(generics.ListCreateAPIView):
    queryset = ReservaSala.objects.select_related("id_sala").all()
    serializer_class = ReservaSalaSerializer

# Endpoint que modifica el estado de la reserva de una sala mediante su id
# y manda un correo al cliente
class ReservaSalaEstadoAPIView(APIView):
    def patch(self, request, id):
        reserva = ReservaSala.objects.get(id = id)

        if not reserva:
            return Response({'error': f'No hay reservas de salas con este id'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ReservaSalaEstadoSerializer(reserva, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Mandar correo
            # reserva.email
            return Response(ReservaSalaSerializer(reserva).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Endpoint que devuelve las reservas confirmadas de una sala mediante su id
class ReservaSalaOcupadoAPIView(APIView):
    def get(self, request, id_sala):
        sala = Sala.objects.get(id = id_sala)

        if not sala:
            return Response({'error': f'No hay salas con este id'}, status=status.HTTP_404_NOT_FOUND)
        
        # Obtener el dia actual
        today = date.today()

        reservas = ReservaSala.objects.filter(id_sala = sala, estado = "confirmado", fecha__gte = today)
        serializer = ReservaSalaOcupadoSerializer(reservas, many=True)
        
        return Response(serializer.data)

class ReservaHabitacionListCreateView(generics.ListCreateAPIView):
    queryset = ReservaHabitacion.objects.select_related("id_habitacion").all()
    serializer_class = ReservaHabitacionSerializer

# Endpoint que modifica el estado de la reserva de una habitacion mediante su id
# y manda un correo al cliente
class ReservaHabitacionEstadoAPIView(APIView):
    def patch(self, request, id):
        reserva = ReservaHabitacion.objects.get(id = id)

        if not reserva:
            return Response({'error': f'No hay reservas de habitaciones con este id'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ReservaHabitacionEstadoSerializer(reserva, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Mandar correo
            # reserva.email
            return Response(ReservaHabitacionSerializer(reserva).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Endpoint que devuelve las reservas confirmadas de una habitacion mediante su id
class ReservaHabitacionOcupadoAPIView(APIView):
    def get(self, request, id_habitacion):
        habitacion = get_object_or_404(Habitacion, id=id_habitacion)

        # Obtener el dia actual
        today = date.today()

        reservas = ReservaHabitacion.objects.filter(id_habitacion = habitacion, estado = "confirmado", fecha_salida__gte = today)
        serializer = ReservaHabitacionOcupadoSerializer(reservas, many=True)
        
        return Response(serializer.data)
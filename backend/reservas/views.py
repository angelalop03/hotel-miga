from datetime import date

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ReservaSala
from .serializer import ReservaSalaSerializer, ReservaSalaEstadoSerializer, ReservaSalaOcupadoSerializer
from sala.models import Sala

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



# TODO habitaciones
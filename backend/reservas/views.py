from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ReservaSala
from .serializer import ReservaSalaSerializer, ReservaSalaEstadoSerializer

class ReservaSalaListCreateView(generics.ListCreateAPIView):
    queryset = ReservaSala.objects.all()
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

# TODO habitaciones
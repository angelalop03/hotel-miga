from datetime import date, datetime

from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Habitacion
from .serializer import HabitacionSerializer

from habitacion.models import Habitacion
from reservas.models import ReservaHabitacion
from habitacion.serializer import HabitacionSerializer
class HabitacionViewSet(viewsets.ModelViewSet):
    queryset = Habitacion.objects.prefetch_related("extras").all()
    serializer_class = HabitacionSerializer
    lookup_field = 'num_habitacion'

# Endpoint para obtener las habitaciones disponibles en un rango de fechas y para un numero de personas
class HabitacionesDisponiblesAPIView(APIView):

    def get(self, request):

        # Obtener los parametros de la query
        fecha_entrada = request.GET.get("fecha_entrada")
        fecha_salida = request.GET.get("fecha_salida")
        personas = request.GET.get("personas")

        # Controlamos bad request
        if not fecha_entrada or not fecha_salida or not personas:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Convertimos las fechas a objetos datetime y el numero de personas a int
        fecha_entrada = datetime.strptime(fecha_entrada, "%Y-%m-%d").date()
        fecha_salida = datetime.strptime(fecha_salida, "%Y-%m-%d").date()
        personas = int(personas)

        # Reservas que se solapan 
        #   Fecha de entrada de la reserva es anterior a la fecha de salida del rango solicitado
        #   Fecha de salida de la reserva es posterior a la fecha de entrada del rango solicitado
        reservas_conflictivas = ReservaHabitacion.objects.filter(
            estado="confirmado",
            fecha_entrada__lt=fecha_salida, # no es lte porque si la fecha de entrada de la reserva es igual a la fecha de salida del rango, no se solapan
            fecha_salida__gt=fecha_entrada
        ).values_list("id_habitacion", flat=True)

        # Filtramos habitaciones que tengan capacidad y que no estén dentro de las solapadas
        habitaciones = Habitacion.objects.filter(
            num_personas__gte=personas
        ).exclude(
            id__in=reservas_conflictivas
        )

        serializer = HabitacionSerializer(habitaciones, many=True)

        return Response(serializer.data)
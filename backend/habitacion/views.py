from rest_framework import viewsets
from .models import Habitacion
from .serializer import HabitacionSerializer


class HabitacionViewSet(viewsets.ModelViewSet):
    queryset = Habitacion.objects.prefetch_related("extras").all()
    serializer_class = HabitacionSerializer
    lookup_field = 'num_habitacion'
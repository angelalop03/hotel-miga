from rest_framework import viewsets
from .models import Sala
from .serializer import SalaSerializer

class SalaViewSet(viewsets.ModelViewSet):
    queryset = Sala.objects.prefetch_related("extras").all()
    serializer_class = SalaSerializer
    lookup_field = "id"
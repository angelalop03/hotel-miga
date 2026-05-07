from rest_framework import viewsets
from .models import Sala
from .serializer import SalaSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class SalaViewSet(viewsets.ModelViewSet):
    queryset = Sala.objects.prefetch_related("extras").all()
    serializer_class = SalaSerializer
    lookup_field = "id"
    permission_classes = [IsAuthenticatedOrReadOnly]
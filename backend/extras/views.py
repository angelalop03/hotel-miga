from rest_framework import viewsets
from .models import Extras
from .serializer import ExtrasSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class ExtrasViewSet(viewsets.ModelViewSet):
    queryset = Extras.objects.all()
    serializer_class = ExtrasSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticatedOrReadOnly]
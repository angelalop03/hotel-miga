from rest_framework import viewsets
from .models import Extras
from .serializer import ExtrasSerializer

# Create your views here.
class ExtrasViewSet(viewsets.ModelViewSet):
    queryset = Extras.objects.all()
    serializer_class = ExtrasSerializer
    lookup_field = 'id'
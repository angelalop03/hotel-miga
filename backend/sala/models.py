from django.db import models
from extras.models import Extras

# Create your models here.
class Sala(models.Model):
    nombre_sala = models.CharField(max_length=50, unique=True, null=False, blank=False)
    precio = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)
    personas_max = models.IntegerField(null=False, blank=False)
    descripcion = models.TextField()
    extras = models.ManyToManyField(Extras, blank=True)

    def __str__(self):
        return self.nombre_sala
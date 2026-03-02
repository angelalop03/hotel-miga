from django.db import models
from extras.models import Extras


class Habitacion(models.Model):
    num_habitacion = models.IntegerField(unique=True, null=False, blank=False)
    precio = models.DecimalField(max_digits=8, decimal_places=2, null=False, blank=False)
    num_personas = models.IntegerField(null=False, blank=False)
    descripcion = models.TextField(blank=True)
    extras = models.ManyToManyField(Extras, blank=True)

    def __str__(self):
        return self.num_habitacion
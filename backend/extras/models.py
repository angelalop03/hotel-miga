from django.db import models

# Create your models here.
class Extras(models.Model):
    nombre = models.CharField(max_length=30, unique=True, null=False, blank=False)

    def __str__(self):
        return self.nombre
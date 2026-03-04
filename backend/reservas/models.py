from django.db import models
from sala.models import Sala

# Enumerado para los tres horarios disponibles para las salas
class Horario(models.TextChoices):
    MANANA = "mañana"
    MEDIODIA = "mediodia"
    NOCHE = "noche"

# Posibles estados de una reserva, por defecto empieza en pendiente
class Estado(models.TextChoices):
    PENDIENTE = "pendiente"
    CONFIRMADO = "confirmado"
    CANCELADO = "cancelado"

class ReservaSala(models.Model):
    id_sala = models.ForeignKey(Sala, on_delete=models.CASCADE)
    fecha = models.DateField()
    horario = models.CharField(max_length=8, choices=Horario.choices)
    nombre = models.CharField(max_length=150, null=False, blank=False)
    email = models.EmailField(null=False, blank=False)
    telefono = models.CharField(max_length=15, null=False, blank=False)
    estado = models.CharField(max_length=10, choices=Estado.choices, default=Estado.PENDIENTE)

    def __str__(self):
        return f"{self.id_sala} - {self.fecha} - {self.horario}"
    
# TODO habitaciones
from rest_framework import serializers
from .models import ReservaSala

# Serializador para crear y eliminar reservas de salas, pero no cambiar su estado
class ReservaSalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaSala
        fields = ["id", "id_sala", "fecha", "horario", "nombre", "email", "telefono", "estado"]
        read_only_fields = ["estado"]
    
    # Añadir el nombre de la sala al GET
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["nombre_sala"] = instance.id_sala.nombre_sala
        return rep

# Serializador solo para cambiar el estado de una sala
class ReservaSalaEstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaSala
        fields = ["estado"]

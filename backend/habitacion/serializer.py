from rest_framework import serializers
from .models import Habitacion
from extras.models import Extras
from extras.serializer import ExtrasSerializer

class HabitacionSerializer(serializers.ModelSerializer):
    extras = ExtrasSerializer(read_only=True, many=True)
    extras_ids = serializers.PrimaryKeyRelatedField(
        queryset=Extras.objects.all(),
        many=True,
        write_only=True,
        source="extras",
        required=False,
    )

    class Meta:
        model = Habitacion
        fields = ["id", "num_habitacion", "precio", "num_personas", "descripcion", "extras", "extras_ids"]

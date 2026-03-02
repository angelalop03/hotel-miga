from rest_framework import serializers
from .models import Sala
from extras.models import Extras
from extras.serializer import ExtrasSerializer

class SalaSerializer(serializers.ModelSerializer):
    extras = ExtrasSerializer(read_only=True, many=True)
    extras_ids = serializers.PrimaryKeyRelatedField(
        queryset=Extras.objects.all(),
        many=True,
        write_only=True,
        source="extras",
        required=False,
    )

    class Meta:
        model = Sala
        fields = ["id", "nombre_sala", "precio", "personas_max", "descripcion", "extras", "extras_ids"]

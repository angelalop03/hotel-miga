from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from .models import Sala


class SalaTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="admin",
            password="admin123"
        )

        self.sala = Sala.objects.create(
            nombre_sala="Sala Azul",
            precio=50,
            personas_max=20,
            descripcion="Sala de reuniones"
        )

    def test_listar_salas_sin_login(self):
        response = self.client.get("/salas/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ver_detalle_sala_sin_login(self):
        response = self.client.get(f"/salas/{self.sala.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_crear_sala_sin_login_no_permitido(self):
        data = {
            "nombre_sala": "Sala Roja",
            "precio": 70,
            "personas_max": 30,
            "descripcion": "Sala grande"
        }

        response = self.client.post("/salas/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_crear_sala_con_login(self):
        self.client.force_authenticate(user=self.user)

        data = {
            "nombre_sala": "Sala Roja",
            "precio": 70,
            "personas_max": 30,
            "descripcion": "Sala grande"
        }

        response = self.client.post("/salas/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Sala.objects.count(), 2)

    def test_actualizar_sala_con_login(self):
        self.client.force_authenticate(user=self.user)

        data = {
            "nombre_sala": "Sala Azul Renovada",
            "precio": 60,
            "personas_max": 25,
            "descripcion": "Sala actualizada"
        }

        response = self.client.put(
            f"/salas/{self.sala.id}/",
            data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.sala.refresh_from_db()
        self.assertEqual(self.sala.nombre_sala, "Sala Azul Renovada")
        self.assertEqual(self.sala.precio, 60)

    def test_eliminar_sala_con_login(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(f"/salas/{self.sala.id}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Sala.objects.count(), 0)
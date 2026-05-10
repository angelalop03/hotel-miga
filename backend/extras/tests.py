from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from .models import Extras


class ExtrasTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="admin",
            password="admin123"
        )

        self.extra = Extras.objects.create(
            nombre="Proyector"
        )

    def test_listar_extras_sin_login(self):
        response = self.client.get("/extras/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ver_detalle_extra_sin_login(self):
        response = self.client.get(f"/extras/{self.extra.id}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_crear_extra_sin_login_no_permitido(self):
        data = {
            "nombre": "Wifi Premium"
        }

        response = self.client.post("/extras/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_crear_extra_con_login(self):
        self.client.force_authenticate(user=self.user)

        data = {
            "nombre": "Wifi Premium"
        }

        response = self.client.post("/extras/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Extras.objects.count(), 2)

    def test_actualizar_extra_con_login(self):
        self.client.force_authenticate(user=self.user)

        data = {
            "nombre": "Proyector HD"
        }

        response = self.client.put(
            f"/extras/{self.extra.id}/",
            data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.extra.refresh_from_db()

        self.assertEqual(self.extra.nombre, "Proyector HD")

    def test_eliminar_extra_con_login(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(f"/extras/{self.extra.id}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Extras.objects.count(), 0)
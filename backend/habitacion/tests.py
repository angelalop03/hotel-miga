from datetime import date, timedelta

from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User

from .models import Habitacion
from reservas.models import ReservaHabitacion


class HabitacionTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username="admin",
            password="admin123"
        )

        self.habitacion = Habitacion.objects.create(
            num_habitacion=101,
            precio=90,
            num_personas=2,
            descripcion="Habitación doble"
        )

    def test_listar_habitaciones_sin_login(self):
        response = self.client.get("/habitaciones/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_ver_detalle_habitacion_sin_login(self):
        response = self.client.get(f"/habitaciones/{self.habitacion.num_habitacion}/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_crear_habitacion_sin_login_no_permitido(self):
        data = {
            "num_habitacion": 102,
            "precio": 100,
            "num_personas": 3,
            "descripcion": "Habitación triple"
        }

        response = self.client.post("/habitaciones/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_crear_habitacion_con_login(self):
        self.client.force_authenticate(user=self.user)

        data = {
            "num_habitacion": 102,
            "precio": 100,
            "num_personas": 3,
            "descripcion": "Habitación triple"
        }

        response = self.client.post("/habitaciones/", data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Habitacion.objects.count(), 2)

    def test_actualizar_habitacion_con_login(self):
        self.client.force_authenticate(user=self.user)

        data = {
            "num_habitacion": 101,
            "precio": 120,
            "num_personas": 2,
            "descripcion": "Habitación doble renovada"
        }

        response = self.client.put(
            f"/habitaciones/{self.habitacion.num_habitacion}/",
            data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.habitacion.refresh_from_db()
        self.assertEqual(self.habitacion.precio, 120)
        self.assertEqual(self.habitacion.descripcion, "Habitación doble renovada")

    def test_eliminar_habitacion_con_login(self):
        self.client.force_authenticate(user=self.user)

        response = self.client.delete(f"/habitaciones/{self.habitacion.num_habitacion}/")

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Habitacion.objects.count(), 0)


class HabitacionesDisponiblesTests(APITestCase):

    def setUp(self):
        self.habitacion_2_personas = Habitacion.objects.create(
            num_habitacion=201,
            precio=90,
            num_personas=2,
            descripcion="Habitación doble"
        )

        self.habitacion_4_personas = Habitacion.objects.create(
            num_habitacion=202,
            precio=150,
            num_personas=4,
            descripcion="Habitación familiar"
        )

    def test_disponibles_faltan_parametros(self):
        response = self.client.get("/habitaciones/disponibles/")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_disponibles_formato_fecha_invalido(self):
        response = self.client.get(
            "/habitaciones/disponibles/?fecha_entrada=mal&fecha_salida=2026-06-22&personas=2"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_disponibles_fecha_entrada_pasada(self):
        ayer = date.today() - timedelta(days=1)
        manana = date.today() + timedelta(days=1)

        response = self.client.get(
            f"/habitaciones/disponibles/?fecha_entrada={ayer}&fecha_salida={manana}&personas=2"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_disponibles_fecha_salida_anterior_o_igual(self):
        manana = date.today() + timedelta(days=1)

        response = self.client.get(
            f"/habitaciones/disponibles/?fecha_entrada={manana}&fecha_salida={manana}&personas=2"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_disponibles_filtra_por_numero_personas(self):
        manana = date.today() + timedelta(days=1)
        pasado = date.today() + timedelta(days=3)

        response = self.client.get(
            f"/habitaciones/disponibles/?fecha_entrada={manana}&fecha_salida={pasado}&personas=4"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["num_habitacion"], 202)

    def test_disponibles_excluye_habitacion_reservada_confirmada(self):
        manana = date.today() + timedelta(days=1)
        pasado = date.today() + timedelta(days=3)

        ReservaHabitacion.objects.create(
            id_habitacion=self.habitacion_2_personas,
            fecha_entrada=manana,
            fecha_salida=pasado,
            num_personas=2,
            nombre="Laura",
            email="laura@email.com",
            telefono="600333444",
            estado="confirmado"
        )

        response = self.client.get(
            f"/habitaciones/disponibles/?fecha_entrada={manana}&fecha_salida={pasado}&personas=2"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        numeros = [habitacion["num_habitacion"] for habitacion in response.data]

        self.assertNotIn(201, numeros)
        self.assertIn(202, numeros)
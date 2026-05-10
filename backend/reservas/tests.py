from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from unittest.mock import patch

from sala.models import Sala
from habitacion.models import Habitacion

from reservas.models import ReservaSala, ReservaHabitacion


# =========================
# TESTS RESERVAS SALAS
# =========================

class ReservaSalaTests(APITestCase):

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

    # Crear reserva correctamente
    def test_crear_reserva_sala(self):

        data = {
            "id_sala": self.sala.id,
            "fecha": "2026-06-20",
            "horario": "mañana",
            "nombre": "Ana",
            "email": "ana@email.com",
            "telefono": "600111222"
        }

        response = self.client.post(
            "/reservas/salas/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            ReservaSala.objects.count(),
            1
        )

    # Ver reservas sin login
    def test_no_ver_reservas_sin_login(self):

        response = self.client.get("/reservas/salas/")

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

    # Ver reservas con login
    def test_ver_reservas_con_login(self):

        self.client.force_authenticate(user=self.user)

        response = self.client.get("/reservas/salas/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    # Cambiar estado sin login
    def test_cambiar_estado_sin_login(self):

        reserva = ReservaSala.objects.create(
            id_sala=self.sala,
            fecha="2026-06-20",
            horario="mañana",
            nombre="Ana",
            email="ana@email.com",
            telefono="600111222"
        )

        response = self.client.patch(
            f"/reservas/salas/estado/{reserva.id}/",
            {"estado": "confirmado"},
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN
        )

    # Cambiar estado con login
    @patch("reservas.views.email_confirmacion_sala")
    def test_cambiar_estado_con_login(self, mock_email):

        reserva = ReservaSala.objects.create(
            id_sala=self.sala,
            fecha="2026-06-20",
            horario="mañana",
            nombre="Ana",
            email="ana@email.com",
            telefono="600111222"
        )

        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            f"/reservas/salas/estado/{reserva.id}/",
            {"estado": "confirmado"},
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        reserva.refresh_from_db()

        self.assertEqual(
            reserva.estado,
            "confirmado"
        )


# =========================
# TESTS RESERVAS HABITACIONES
# =========================

class ReservaHabitacionTests(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            username="admin2",
            password="admin123"
        )

        self.habitacion = Habitacion.objects.create(
            num_habitacion=101,
            precio=90,
            num_personas=2,
            descripcion="Habitación doble"
        )

    # Crear reserva habitación
    def test_crear_reserva_habitacion(self):

        data = {
            "id_habitacion": self.habitacion.id,
            "fecha_entrada": "2026-06-20",
            "fecha_salida": "2026-06-22",
            "num_personas": 2,
            "nombre": "Laura",
            "email": "laura@email.com",
            "telefono": "600333444"
        }

        response = self.client.post(
            "/reservas/habitaciones/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )

        self.assertEqual(
            ReservaHabitacion.objects.count(),
            1
        )

    # No ver reservas sin login
    def test_no_ver_habitaciones_sin_login(self):

        response = self.client.get("/reservas/habitaciones/")

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

    # Ver reservas con login
    def test_ver_habitaciones_con_login(self):

        self.client.force_authenticate(user=self.user)

        response = self.client.get("/reservas/habitaciones/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

    # Cambiar estado sin login
    def test_cambiar_estado_habitacion_sin_login(self):

        reserva = ReservaHabitacion.objects.create(
            id_habitacion=self.habitacion,
            fecha_entrada="2026-06-20",
            fecha_salida="2026-06-22",
            num_personas=2,
            nombre="Laura",
            email="laura@email.com",
            telefono="600333444"
        )

        response = self.client.patch(
            f"/reservas/habitaciones/estado/{reserva.id}/",
            {"estado": "confirmado"},
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN
        )

    # Cambiar estado con login
    @patch("reservas.views.email_confirmacion_habitacion")
    def test_cambiar_estado_habitacion_con_login(self, mock_email):

        reserva = ReservaHabitacion.objects.create(
            id_habitacion=self.habitacion,
            fecha_entrada="2026-06-20",
            fecha_salida="2026-06-22",
            num_personas=2,
            nombre="Laura",
            email="laura@email.com",
            telefono="600333444"
        )

        self.client.force_authenticate(user=self.user)

        response = self.client.patch(
            f"/reservas/habitaciones/estado/{reserva.id}/",
            {"estado": "confirmado"},
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        reserva.refresh_from_db()

        self.assertEqual(
            reserva.estado,
            "confirmado"
        )
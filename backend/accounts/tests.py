from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status


class AccountsTests(APITestCase):

    def setUp(self):

        self.staff_user = User.objects.create_user(
            username="admin",
            password="admin123",
            is_staff=True
        )

        self.normal_user = User.objects.create_user(
            username="usuario",
            password="user123",
            is_staff=False
        )

    # =========================
    # LOGIN
    # =========================

    def test_login_admin_correcto(self):

        data = {
            "username": "admin",
            "password": "admin123"
        }

        response = self.client.post(
            "/api/login/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.json()["ok"],
            True
        )

    def test_login_password_incorrecta(self):

        data = {
            "username": "admin",
            "password": "mal"
        }

        response = self.client.post(
            "/api/login/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

        self.assertEqual(
            response.json()["ok"],
            False
        )

    def test_login_usuario_no_staff(self):

        data = {
            "username": "usuario",
            "password": "user123"
        }

        response = self.client.post(
            "/api/login/",
            data,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

        self.assertEqual(
            response.json()["ok"],
            False
        )

    # =========================
    # LOGOUT
    # =========================

    def test_logout(self):

        self.client.force_login(self.staff_user)

        response = self.client.post("/api/logout/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(
            response.json()["ok"],
            True
        )
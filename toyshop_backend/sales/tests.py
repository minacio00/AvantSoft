from rest_framework.test import APITestCase, APIClient
from rest_framework.response import Response
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from customers.models import Customer


class SalesTests(APITestCase):
    client: APIClient

    def setUp(self):
        User.objects.create_user("test", "t@test.com", "pass")

        resp: Response = self.client.post(
            reverse("token_obtain_pair"),
            {"username": "test", "password": "pass"},
        )
        token = resp.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        self.cust: Customer = Customer.objects.create(
            nomeCompleto="Ana", email="a@b.com", nascimento="1992-05-01"
        )

    def test_sale_and_stats(self):
        # create sales
        self.client.post(
            "/api/sales/",
            {"customer": self.cust.id, "data": "2024-01-01", "valor": "100"},
        )
        self.client.post(
            "/api/sales/",
            {"customer": self.cust.id, "data": "2024-01-02", "valor": "200"},
        )

        # daily-stats
        r: Response = self.client.get("/api/sales/daily-stats/")
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertIn({"data": "2024-01-01", "total": "100.00"}, r.data)

        # leaderboards
        r = self.client.get("/api/sales/leaderboards/")
        self.assertEqual(r.data["best_volume"]["customer__nomeCompleto"], "Ana")

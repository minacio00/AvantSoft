from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User


class CustomerTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user("test", "t@test.com", "pass")
        resp = self.client.post(
            reverse("token_obtain_pair"), {"username": "test", "password": "pass"}
        )
        self.token = resp.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token}")

    def test_create_list_update_delete(self):
        data = {
            "nomeCompleto": "João",
            "email": "joao@example.com",
            "nascimento": "1990-01-01",
        }
        r = self.client.post("/api/customers/", data)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)

        r = self.client.get("/api/customers/", {"search": "João"})
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(len(r.data), 1)

        cust_id = r.data[0]["id"]
        r = self.client.patch(
            f"/api/customers/{cust_id}/", {"nomeCompleto": "João Silva"}
        )
        self.assertEqual(r.data["nomeCompleto"], "João Silva")

        # Delete
        r = self.client.delete(f"/api/customers/{cust_id}/")
        self.assertEqual(r.status_code, status.HTTP_204_NO_CONTENT)

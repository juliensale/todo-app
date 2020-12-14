from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse("users:create")
TOKEN_URL = reverse("users:token")
ME_URL = reverse("users:me")


def create_user(**params):
    return get_user_model().objects.create(**params)

class PublicUserApiTests(TestCase):
    """Tests des fonctionnalités qui ne requierent pas la connexion"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test que la création d'un user avec des arguments valides fonctionne"""
        payload = {
            'username': 'Test',
            'email': 'test@email.com',
            'password': 'testpass'
        }

        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn(payload['password'], res.data)

    def test_username_taken(self):
        """Test que la création d'un user avec un pseudo déjà existant échoue"""
        payload = {
            'username': 'Test',
            'email': 'test@email.com',
            'password': 'testpass'
        }

        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, {
            'username': 'Test',
            'email': 'test2@email.com',
            'password': 'testpass'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_email_taken(self):
        """Test que la création d'un user avec un mail déjà utilisé échoue"""
        payload = {
            'username': 'Test',
            'email': 'test@email.com',
            'password': 'testpass'
        }

        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, {
            'username': 'TestUser',
            'email': 'test@email.com',
            'password': 'testpass'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse("users:create")
TOKEN_URL = reverse("users:token")
ME_URL = reverse("users:me")


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Tests des fonctionnalités qui ne requierent pas la connexion"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test création user avec des arguments valides"""
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
        """Test création user avec pseudo déjà pris échoue"""
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

    def test_create_token_for_user(self):
        """Test la création d'un token pour un user"""
        payload = {
            'username': 'test',
            'email': 'test@email.com',
            'password': 'testpass'
        }
        create_user(**payload)
        res = self.client.post(TOKEN_URL, {
            'email': payload['email'],
            'password': payload['password']
        })

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test création token échoue pour des arguments invalides"""
        create_user(**{
            'username': 'test',
            'email': 'test@email.com',
            'password': 'testpass'
        })

        res = self.client.post(TOKEN_URL, {
            'username': 'test',
            'email': 'test@email.com',
            'password': 'wrong'
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_create_token_no_user(self):
        """Test création token pour user inexistant échoue"""
        payload = {
            'username': 'test',
            'email': 'test@email.com',
            'password': 'testpass'
        }

        res = self.client.post(TOKEN_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_create_token_missing_field(self):
        """Test que username, email et password sont requis"""
        res = self.client.post(TOKEN_URL, {
            'username': 'test',
            'email': 'one',
            'password': ''
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('token', res.data)

    def test_retrieve_unauthorized_user(self):
        """Test que la partie users:me est interdite"""
        res = self.client.get(ME_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):

    def setUp(self):
        self.user = create_user(
            username='test',
            email='test@londonappdev.com',
            password='testpass',
            name='Test Name'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_user(self):
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'username': self.user.username,
            'name': self.user.name,
            'email': self.user.email
        })

    def test_post_me_not_allowed(self):
        """Test qu'on ne peut utiliser la méthode post sur users:me"""
        res = self.client.post(ME_URL, {})
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_profile(self):
        payload = {
            'name': 'Test Name',
            'password': 'newpassword123'
        }

        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))

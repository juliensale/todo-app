from django.test import TestCase
from django.contrib.auth import get_user_model


def sample_user(username='test', email='test@email.com', password='testpass'):
    return get_user_model().objects.create_user(username ,email, password)


class ModelsTests(TestCase):

    """User part"""

    def test_create_user_successful(self):
        """Test que la création d'un user avec username, email et password fonctionne"""
        username = "test"
        email = "test@email.com"
        password = "testpass"

        user = get_user_model().objects.create_user(username, email, password)

        self.assertEqual(username, user.username)
        self.assertEqual(email, user.email)
        self.assertTrue(user.check_password(password))

    def test_user_email_normalized(self):
        """Test que l'email est normalisé"""
        email = "test@EMAIL.COM"
        user = get_user_model().objects.create_user('test', email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_user_invalid_username(self):
        """Test qu'un user ne peut être créé sans username"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None,'test@email.com', 'testpass')

    def test_user_invalid_email(self):
        """Test qu'un user ne peut être créé sans email"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('test', None, 'testpass')

    def test_create_superuser(self):
        """Test qu'un superuser a bien les droits de superuser et de staff"""
        user = get_user_model().objects.create_superuser('test', 'test@email.com', 'testpasss')

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

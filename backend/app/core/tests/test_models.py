from django.test import TestCase
from django.contrib.auth import get_user_model
from core import models

from django.core.exceptions import PermissionDenied


def sample_user(username='test', email='test@email.com', password='testpass'):
    return get_user_model().objects.create_user(username, email, password)


class UserModelTests(TestCase):

    def test_create_user_successful(self):
        """Test création custom user"""
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
            get_user_model().objects.create_user(
                None,
                'test@email.com',
                'testpass'
            )

    def test_user_invalid_email(self):
        """Test qu'un user ne peut être créé sans email"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(
                'test',
                None,
                'testpass'
            )

    def test_create_superuser(self):
        """Test qu'un superuser a bien les droits de superuser et de staff"""
        user = get_user_model().objects.create_superuser(
            'test',
            'test@email.com',
            'testpasss'
        )

        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)


class ListModelTests(TestCase):

    def test_list_str(self):
        """Test la représentation des listes"""
        list = models.List.objects.create(
            user=sample_user(),
            title='Food',
            color='red'
        )

        self.assertEqual(str(list), list.title)


class SublistModelTests(TestCase):

    def setUp(self):
        self.user = sample_user()
        self.list = models.List.objects.create(
            user=self.user,
            title="liste test",
            color="blue"
        )
        self.sublist = models.SubList.objects.create(
            title="sous liste test",
            list=self.list,
            user=self.user
        )

    def test_sublist_str(self):
        """Test la représentation des sous-listes"""

        self.assertEqual(str(self.sublist), self.sublist.title)

    def test_sublist_inherit_user(self):
        """Test l'héritage du user"""

        self.assertEqual(self.sublist.user, self.list.user)

    def test_create_sublist_other_user(self):
        """Test que l'on ne peut pas créer de sous-liste
           depuis une liste d'un autre utilisateur"""

        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testpass123"
        )
        with self.assertRaises(PermissionDenied):
            models.SubList.objects.create(
                list=self.list,
                title="test",
                user=user2
            )


class TaskModelTests(TestCase):

    def setUp(self):
        self.user = sample_user()
        self.list = models.List.objects.create(
            user=self.user,
            title="liste test",
            color="blue"
        )
        self.sublist = models.SubList.objects.create(
            title="sous liste test",
            list=self.list,
            user=self.user
        )
        self.task = models.Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="tache test",
            completed=False,
        )

    def test_task_str(self):
        """Test la représentation des taches"""
        self.assertEqual(str(self.task), self.task.title)

    def test_task_other_user(self):
        """Test que l'on ne peut pas créer une tâche
           à partir d'une sous-liste d'un autre utilisateur"""
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="user2pass"
        )

        with self.assertRaises(PermissionDenied):
            models.Task.objects.create(
                user=user2,
                sublist=self.sublist,
                title="tache test",
                completed=False,
            )


class SubTaskModelTests(TestCase):

    def setUp(self):
        self.user = sample_user()
        self.list = models.List.objects.create(
            user=self.user,
            title="liste test",
            color="blue"
        )
        self.sublist = models.SubList.objects.create(
            title="sous liste test",
            list=self.list,
            user=self.user
        )
        self.task = models.Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="tache test",
            completed=False
        )
        self.subtask = models.SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="sous-tache test",
            completed=False
        )

    def test_subtask_str(self):
        """Test la représentation des sous-tâches"""
        self.assertEqual(str(self.subtask), self.subtask.title)

    def test_create_subtask_other_user(self):
        """Test que l'on ne peut pas créer de sous-tâche
           à partir d'une tâche d'un autre utilistaeur"""
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testpass123"
        )
        with self.assertRaises(PermissionDenied):
            models.SubTask.objects.create(
                user=user2,
                task=self.task,
                title="sa sous-tache",
                completed=False
            )

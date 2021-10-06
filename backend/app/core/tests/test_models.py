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

    def test_set_complete(self):
        self.task.set_completed(True)
        self.assertTrue(self.task.completed)


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

        self.subtask2 = models.SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="sous-tache test 2",
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

    def test_set_complete(self):
        self.subtask.set_completed(True)
        self.assertTrue(self.subtask.completed)

    def test_complete_task(self):
        """Test que la complétion d'un tâche
           complète toutes les sous-tâches filles"""
        self.task.complete()

        self.subtask.refresh_from_db()
        self.subtask2.refresh_from_db()
        self.assertTrue(self.subtask.completed)
        self.assertTrue(self.subtask2.completed)

    def test_uncomplete_task(self):
        """Test que la dé-complétion d'un tâche
           dé-complète toutes les sous-tâches filles"""
        self.task.complete()

        self.task.uncomplete()

        self.subtask.refresh_from_db()
        self.subtask2.refresh_from_db()
        self.assertFalse(self.subtask.completed)
        self.assertFalse(self.subtask2.completed)

    def test_complete_all_subtasks(self):
        """Test que la complétion de toutes les sous-tâches
           complète la tâche mère"""
        self.subtask.complete()

        # Une seule sous-tache ne doit pas compléter la tache mere
        self.task.refresh_from_db()
        self.assertFalse(self.task.completed)

        self.subtask2.complete()

        self.task.refresh_from_db()
        self.assertTrue(self.task.completed)

    def test_uncomplete_subtask(self):
        """Test que la dé-complétion d'une seule sous-tâche
           dé-complète la tâche mère, sans impacter ses soeurs"""
        self.task.complete()

        self.subtask.uncomplete()

        self.subtask.refresh_from_db()
        self.assertFalse(self.subtask.completed)
        self.task.refresh_from_db()
        self.assertFalse(self.task.completed)
        self.subtask2.refresh_from_db()
        self.assertTrue(self.subtask2.completed)

    def test_create_subtask_uncomplete_subtask(self):
        """Test that creating a subtask uncompletes the mother task"""
        self.task.complete()

        self.task.refresh_from_db()
        self.subtask.refresh_from_db()
        self.subtask2.refresh_from_db()

        self.assertTrue(self.task.completed)
        self.assertTrue(self.subtask.completed)
        self.assertTrue(self.subtask2.completed)

        models.SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="sous-tâche test 3",
            completed=False
        )

        self.task.refresh_from_db()
        self.subtask.refresh_from_db()
        self.subtask2.refresh_from_db()

        self.assertFalse(self.task.completed)
        self.assertTrue(self.subtask.completed)
        self.assertTrue(self.subtask2.completed)

    def test_delete_subtask_complete_subtask(self):
        """Test that deleting a subtask can complete the mother task"""
        self.task.complete()

        subtask_test = models.SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="sous-tâche test 3",
            completed=False
        )

        self.task.refresh_from_db()
        self.subtask.refresh_from_db()
        self.subtask2.refresh_from_db()

        self.assertFalse(self.task.completed)
        self.assertTrue(self.subtask.completed)
        self.assertTrue(self.subtask2.completed)
        self.assertFalse(subtask_test.completed)

        subtask_test.delete()

        self.task.refresh_from_db()
        self.subtask.refresh_from_db()
        self.subtask2.refresh_from_db()

        self.assertTrue(self.task.completed)
        self.assertTrue(self.subtask.completed)
        self.assertTrue(self.subtask2.completed)

    def test_delete_subtask_complete_subtask_not_bugged(self):
        """Test that deleting a subtask does not complete the mother task everytime"""
        self.subtask.complete()

        subtask_test = models.SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="sous-tâche test 3",
            completed=False
        )

        self.assertFalse(self.task.completed)
        self.assertTrue(self.subtask.completed)
        self.assertFalse(self.subtask2.completed)
        self.assertFalse(subtask_test.completed)

        subtask_test.delete()

        self.assertFalse(self.task.completed)
        self.assertTrue(self.subtask.completed)
        self.assertFalse(self.subtask2.completed)

    def test_delete_last_subtask_not_complete(self):
        """Test that deleting the last subtask does not complete the mother task"""
        task = models.Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Test task",
        )
        subtask = models.SubTask.objects.create(
            user=self.user,
            task=task,
            title="Test subtask",
        )
        self.assertFalse(task.completed)

        subtask.delete()
        task.refresh_from_db()

        self.assertFalse(task.completed)

    def test_delete_last_subtask_not_uncomplete(self):
        """Test that deleting the last subtask does not uncomplete the mother task"""
        task = models.Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="tache test",
            completed=True
        )
        subtask = models.SubTask.objects.create(
            user=self.user,
            task=task,
            title="sous-tache test",
            completed=True
        )
        self.assertTrue(task.completed)

        subtask.delete()
        task.refresh_from_db()

        self.assertTrue(task.completed)

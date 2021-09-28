from django.test import TestCase
from django.contrib.auth import get_user_model
from core.models import List, SubList, Task, SubTask
from todo.serializers import SubTaskSerializer
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

SUBTASKS_URL = reverse('todo:subtask-list')


def get_detail_url(id):
    return reverse(
        'todo:subtask-detail',
        kwargs={
            'pk': id
        }
    )


class PublicSubTaskApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        res = self.client.get(SUBTASKS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateSubTaskApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@email.com',
            password='testpass'
        )
        self.client.force_authenticate(user=self.user)
        self.list = List.objects.create(
            user=self.user,
            title="Ma liste",
            color="red"
        )
        self.sublist = SubList.objects.create(
            user=self.user,
            list=self.list,
            title="Ma sous-liste"
        )
        self.task = Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Ma tâche"
        )

    def test_retrieve_subtasks(self):
        SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="subtask1"
        )
        SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="subtask2"
        )

        res = self.client.get(SUBTASKS_URL)
        subtasks = SubTask.objects.all().order_by('id')
        serializer = SubTaskSerializer(subtasks, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data, serializer.data)

    def test_subtasks_limited_to_user(self):
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testspassss123"
        )
        list2 = List.objects.create(
            user=user2,
            color="red",
            title="Sa tache"
        )
        sublist2 = SubList.objects.create(
            user=user2,
            list=list2,
            title="Sa tache"
        )
        task2 = Task.objects.create(
            user=user2,
            sublist=sublist2,
            title="Sa tache",
        )
        SubTask.objects.create(
            user=user2,
            task=task2,
            title="Sa sous-tache",
        )
        subtask = SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="Ma sous-tache",
        )

        res = self.client.get(SUBTASKS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['title'], subtask.title)

    def test_create_subtask_successful(self):
        """Test la création d'une sous-tache"""
        payload = {
            'task': self.task.id,
            'title': 'Subtask test'
        }

        res = self.client.post(SUBTASKS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['title'], payload['title'])

    def test_create_subtask_invalid_credentials(self):
        """Test que la création d'une sous-tache avec
        des arguments invalides échoue"""
        res = self.client.post(SUBTASKS_URL, {
            'task': '',
            'title': ''
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_subtask(self):
        """Test l'édition d'une sous tache"""
        subtask = SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="Subtask test"
        )

        payload = {
            'title': 'modified'
        }

        res = self.client.patch(
            get_detail_url(subtask.id),
            payload
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['title'], payload['title'])

    def test_delete_subtask(self):
        """Test la suppression d'une sous tache"""
        subtask = SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="Subtask test"
        )

        res = self.client.delete(
            get_detail_url(subtask.id)
        )
        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertNotIn(subtask, SubTask.objects.all())

    def test_detail_view_limited_to_owner(self):
        """Test que l'on ne peut pas accéder
           aux sous-taches d'autres utilisateurs"""
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testspassss123"
        )
        list2 = List.objects.create(
            user=user2,
            color="red",
            title="Sa tache"
        )
        sublist2 = SubList.objects.create(
            user=user2,
            list=list2,
            title="Sa tache"
        )
        task2 = Task.objects.create(
            user=user2,
            sublist=sublist2,
            title="Sa tache",
        )
        subtask2 = SubTask.objects.create(
            user=user2,
            task=task2,
            title="Sa sous-tache",
        )

        res = self.client.get(
            get_detail_url(subtask2.id)
        )

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_limited_to_owner(self):
        """Test que l'on ne peut pas supprimer
           les sous taches d'autres utilisateurs"""
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testspassss123"
        )
        list2 = List.objects.create(
            user=user2,
            color="red",
            title="Sa tache"
        )
        sublist2 = SubList.objects.create(
            user=user2,
            list=list2,
            title="Sa tache"
        )
        task2 = Task.objects.create(
            user=user2,
            sublist=sublist2,
            title="Sa tache",
        )
        subtask2 = SubTask.objects.create(
            user=user2,
            task=task2,
            title="Sa sous-tache",
        )

        res = self.client.delete(
            get_detail_url(subtask2.id)
        )

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_complete_subtask(self):
        """Test la completion d'une sous-tache"""
        subtask = SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="Subtask test"
        )

        res = self.client.put(reverse(
            'todo:subtask-complete',
            kwargs={
                'pk': subtask.id
            }
        )
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        subtask.refresh_from_db()
        self.assertTrue(subtask.completed)

    def test_uncomplete_subtask(self):
        """Test la dé-completion d'une sous-tache"""
        subtask = SubTask.objects.create(
            user=self.user,
            task=self.task,
            title="Subtask test",
            completed=True
        )

        res = self.client.put(reverse(
            'todo:subtask-uncomplete',
            kwargs={
                'pk': subtask.id
            }
        )
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        subtask.refresh_from_db()
        self.assertFalse(subtask.completed)

    def test_complete_limited_to_user(self):
        """Test que l'on ne peut pas completer
           la sous-tache d'un autre utilisateur"""
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testspassss123"
        )
        list2 = List.objects.create(
            user=user2,
            color="red",
            title="Sa tache"
        )
        sublist2 = SubList.objects.create(
            user=user2,
            list=list2,
            title="Sa tache"
        )
        task2 = Task.objects.create(
            user=user2,
            sublist=sublist2,
            title="Sa tache",
        )
        subtask2 = SubTask.objects.create(
            user=user2,
            task=task2,
            title="Sa sous-tache",
        )

        res = self.client.put(reverse(
            'todo:subtask-complete',
            kwargs={
                'pk': subtask2.id
            }
        ))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        subtask2.refresh_from_db()
        self.assertFalse(subtask2.completed)

    def test_uncomplete_limited_to_user(self):
        """Test que l'on ne peut pas completer
           la sous-tache d'un autre utilisateur"""
        user2 = get_user_model().objects.create_user(
            username="user2",
            email="user2@email.com",
            password="testspassss123"
        )
        list2 = List.objects.create(
            user=user2,
            color="red",
            title="Sa tache"
        )
        sublist2 = SubList.objects.create(
            user=user2,
            list=list2,
            title="Sa tache"
        )
        task2 = Task.objects.create(
            user=user2,
            sublist=sublist2,
            title="Sa tache",
        )
        subtask2 = SubTask.objects.create(
            user=user2,
            task=task2,
            title="Sa sous-tache",
            completed=True
        )

        res = self.client.put(reverse(
            'todo:subtask-uncomplete',
            kwargs={
                'pk': subtask2.id
            }
        ))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        subtask2.refresh_from_db()
        self.assertTrue(subtask2.completed)

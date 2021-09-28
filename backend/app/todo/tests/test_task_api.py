from django.test import TestCase
from core.models import Task, List, SubList
from todo.serializers import TaskSerializer
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status

TASKS_URL = reverse('todo:task-list')


def get_detail_url(id):
    return reverse('todo:task-detail', kwargs={'pk': id})


class PublicTaskApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        res = self.client.get(TASKS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateTaskApiTests(TestCase):

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

    def test_retrieve_tasks(self):
        """Test que les taches soient affichees"""
        Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Premiere tache",
        )
        Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Deuxeiem tache",
        )

        res = self.client.get(TASKS_URL)
        tasks = Task.objects.all().order_by('id')
        serializer = TaskSerializer(tasks, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data, serializer.data)

    def test_tasks_limited_to_user(self):
        """Test que seules les taches de l'utilisateur sont affichees"""
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
        Task.objects.create(
            user=user2,
            sublist=sublist2,
            title="Sa tache",
        )
        task = Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Ma tache",
        )

        res = self.client.get(TASKS_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['title'], task.title)

    def test_create_task_successfull(self):
        """Test la création d'un tache"""
        payload = {
            'sublist': self.sublist.id,
            'title': "Tache test"
        }
        res = self.client.post(TASKS_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        exists = Task.objects.all().filter(
            title=payload['title'],
            sublist=payload['sublist']
        ).exists()

        self.assertTrue(exists)

    def test_create_task_invalid_credentials(self):
        """Test que la création d'une tache avec des
        arguments invalides échoue"""
        res = self.client.post(TASKS_URL, {
            'sublist': '',
            'title': '',
        })

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_task(self):
        task = Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Ma tache"
        )
        payload = {
            'title': 'modified'
        }

        res = self.client.patch(
            get_detail_url(task.id),
            payload
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['title'], payload['title'])

    def test_delete_task(self):
        task = Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Ma tache"
        )

        res = self.client.delete(
            get_detail_url(task.id)
        )

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertNotIn(task, Task.objects.all())

    def test_detail_task_limited_to_user(self):
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

        res = self.client.get(
            get_detail_url(task2.id)
        )

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_limited_to_user(self):
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

        res = self.client.get(
            get_detail_url(task2.id)
        )
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

    def test_complete_task(self):
        """Test la complétion d'une tâche"""
        task = Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Ma tache"
        )

        res = self.client.put(reverse(
            'todo:task-complete',
            kwargs={
                'pk': task.id
            }
        ))

        task.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(task.completed)

    def test_uncomplete_task(self):
        """Test la dé-complétion d'une tâche"""
        task = Task.objects.create(
            user=self.user,
            sublist=self.sublist,
            title="Ma tache",
            completed=True
        )

        res = self.client.put(reverse(
            'todo:task-uncomplete',
            kwargs={
                'pk': task.id
            }
        ))

        task.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertFalse(task.completed)

    def test_complete_limited_to_owner(self):
        """Test qu'on ne peut completer les taches d'un autre utilisateur"""
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

        res = self.client.put(reverse(
            'todo:task-complete',
            kwargs={
                'pk': task2.id
            }
        ))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        task2.refresh_from_db()
        self.assertFalse(task2.completed)

    def test_uncomplete_limited_to_owner(self):
        """Test qu'on ne peut dé-completer les taches d'un autre utilisateur"""
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
            completed=True
        )

        res = self.client.put(reverse(
            'todo:task-uncomplete',
            kwargs={
                'pk': task2.id
            }
        ))

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)
        task2.refresh_from_db()
        self.assertTrue(task2.completed)

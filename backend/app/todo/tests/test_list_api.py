from core.models import List
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework import status
from todo.serializers import ListSerializer

LISTS_URL = reverse("todo:list-list")


class PublicListApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Verifie que l'authentification est requise"""
        res = self.client.get(LISTS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateListApiTests(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='test',
            email='test@email.com',
            password='testpass123'
        )
        self.client = APIClient()

        self.client.force_authenticate(user=self.user)

    def test_retrieve_lists(self):
        """Test retrieving lists"""
        List.objects.create(user=self.user, title="liste 1", color="red")
        List.objects.create(user=self.user, title="liste 2", color="blue")

        res = self.client.get(LISTS_URL)
        lists = List.objects.all().order_by('-title')
        serializer = ListSerializer(lists, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_lists_limited_to_user(self):
        """Test that lists returned are for the authenticated user"""
        user2 = get_user_model().objects.create_user(
            username='user2',
            email="user2@email.com",
            password="testpass132"
        )
        list = List.objects.create(
            user=self.user,
            title="User list",
            color="red"
        )
        List.objects.create(
            user=user2,
            title="Other list",
            color="blue"
        )

        res = self.client.get(LISTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data[0]['title'], list.title)
        self.assertEqual(len(res.data), 1)

    def test_create_list_successful(self):
        """Test la création d'une liste"""
        payload = {
            'user': self.user,
            'title': 'Liste test',
            'color': 'red'
        }

        self.client.post(LISTS_URL, payload)

        exists = List.objects.all().filter(
            user=payload['user'],
            title=payload['title'],
            color=payload['color']
        ).exists()

        self.assertTrue(exists)

    def test_create_list_invalid(self):
        """Test creating a new list with invalid payload fails"""
        payload = {
            'user': self.user,
            'title': '',
            'color': ''
        }

        res = self.client.post(LISTS_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_list(self):
        """Test la modification d'une liste"""
        list = self.client.post(LISTS_URL, {
            "user": self.user,
            "title": "testliste",
            "color": "red"
        }).data

        precise_url = reverse(
            'todo:list-detail',
            kwargs={"pk": list['id']}
        )

        res = self.client.patch(
            precise_url,
            {'title': 'modifiedtitle'}
        )

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['title'], 'modifiedtitle')

    def test_detail_view_limited_to_owner(self):
        """Vérifie que l'on ne peut voir que ses propres listes"""
        user2 = get_user_model().objects.create_user(
            username="test2",
            email="test2@email.com",
            password="testpass123"
        )

        liste = List.objects.create(
            title="listetest",
            user=user2,
            color="red"
        )

        precise_url = reverse(
            'todo:list-detail',
            kwargs={"pk": liste.id}
        )
        res = self.client.get(precise_url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

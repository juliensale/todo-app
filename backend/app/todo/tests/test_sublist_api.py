from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

from core.models import List, SubList

from rest_framework import status
from rest_framework.test import APIClient
from todo.serializers import SubListSerializer

SUBLISTS_URL = reverse('todo:sublist-list')


class PublicSublistApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test que l'authentification soit requise"""
        res = self.client.get(SUBLISTS_URL)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateSublistApiTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='test@email.com',
            password='testpass'
        )
        self.client.force_authenticate(user=self.user)
        self.liste = List.objects.create(
            user=self.user,
            title="Ma liste",
            color="red"
        )

    def test_retrieve_sublists(self):
        """Test que les sous-listes sont bien affichées"""
        SubList.objects.create(
            list=self.liste,
            title="sous liste 1",
            user=self.user
        )

        SubList.objects.create(
            list=self.liste,
            title="sous liste 2",
            user=self.user
        )

        res = self.client.get(SUBLISTS_URL)
        sublists = SubList.objects.all().order_by('-title')
        serializer = SubListSerializer(sublists, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_sublists_limited_to_user(self):
        """Test que seules les sous-listes de l'utilisateur sont affichées"""
        user2 = get_user_model().objects.create_user(
            username="test2",
            email="user2@email.com",
            password="testpass123"
        )

        liste2 = List.objects.create(
            user=user2,
            title="Non",
            color="blue"
        )

        subliste = SubList.objects.create(
            list=self.liste,
            title="ma sous-liste",
            user=self.user
        )
        SubList.objects.create(
            list=liste2,
            title="sa sous-liste",
            user=user2
        )

        res = self.client.get(SUBLISTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data[0]['title'], subliste.title)
        self.assertEqual(len(res.data), 1)

    def test_create_sublist_successful(self):
        """Test la création d'une sous-liste"""
        payload = {
            'list': self.liste.id,
            'title': 'ma sous-liste'
        }
        res = self.client.post(SUBLISTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        exists = SubList.objects.all().filter(
            list=payload['list'],
            title=payload['title']
        ).exists()

        self.assertTrue(exists)

    def test_create_sublist_invalid(self):
        """Test création d'une sous-liste avec arguments invalides échoue"""
        payload = {
            'list': '',
            'title': ''
        }

        res = self.client.post(SUBLISTS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_sublist(self):
        """Test la modification d'une sous-liste"""
        subliste = SubList.objects.create(
            list=self.liste,
            title="ma sous-liste",
            user=self.user
        )
        precise_url = reverse(
            'todo:sublist-detail',
            kwargs={'pk': subliste.id}
        )

        mod_payload = {
            'title': 'modified'
        }

        res = self.client.patch(precise_url, mod_payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['title'], mod_payload['title'])

    def test_detail_view_limited_to_owner(self):
        user2 = get_user_model().objects.create_user(
            username="test2",
            email="user2@email.com",
            password="testpass123"
        )
        liste2 = List.objects.create(
            user=user2,
            title="Non",
            color="blue"
        )
        subliste2 = SubList.objects.create(
            list=liste2,
            title="sa sous-liste",
            user=user2
        )

        precise_url = reverse(
            'todo:sublist-detail',
            kwargs={'pk': subliste2.id}
        )
        res = self.client.get(precise_url)

        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

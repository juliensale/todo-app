# from rest_framework.decorators import action
# from rest_framework.response import Response
from rest_framework import viewsets, mixins  # , status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


from todo.serializers import ListSerializer
from core.models import List


class BaseItemViewSet(viewsets.GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin):

    """View set de base, réutilisé pour les différents modèles"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retourne les objects pour l'utilisateur connecté seulement"""
        return self.queryset.filter(
            user=self.request.user
        ).order_by('-title')

    def perform_create(self, serializer):
        """Création d'un nouvel objet"""
        serializer.save(user=self.request.user)


class ListViewSet(BaseItemViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer

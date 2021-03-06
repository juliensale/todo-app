# from rest_framework.decorators import action
# from rest_framework.response import Response
from rest_framework import viewsets, mixins  # , status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


from todo.serializers import ListSerializer, SubListSerializer, \
    TaskSerializer, SubTaskSerializer
from core.models import List, SubList, Task, SubTask


class BaseItemViewSet(viewsets.GenericViewSet,
                      mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin):

    """View set de base, réutilisé pour les différents modèles"""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retourne les objects pour l'utilisateur connecté seulement"""
        return self.queryset.filter(
            user=self.request.user
        ).order_by('id')

    def perform_create(self, serializer):
        """Création d'un nouvel objet"""
        serializer.save(user=self.request.user)


class ListViewSet(BaseItemViewSet):
    queryset = List.objects.all()
    serializer_class = ListSerializer


class SubListViewSet(BaseItemViewSet):
    queryset = SubList.objects.all()
    serializer_class = SubListSerializer


class TaskViewSet(BaseItemViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(
        methods=['put'],
        detail=True,
        permission_classes=[IsAuthenticated]
    )
    def complete(self, request, pk=None):
        task = self.queryset.get(id=pk)
        if request.user == task.user:
            task.complete()
            data = {
                "id": task.id,
                "sublist": task.sublist.id,
                "title": task.title,
                "completed": task.completed
            }
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(
        methods=['put'],
        detail=True,
        permission_classes=[IsAuthenticated]
    )
    def uncomplete(self, request, pk=None):
        task = self.queryset.get(id=pk)
        if request.user == task.user:
            task.uncomplete()
            data = {
                "id": task.id,
                "sublist": task.sublist.id,
                "title": task.title,
                "completed": task.completed
            }
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SubTaskViewSet(BaseItemViewSet):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerializer

    @action(
        methods=['put'],
        detail=True,
        permission_classes=[IsAuthenticated]
    )
    def complete(self, request, pk=None):
        subtask = self.queryset.get(id=pk)
        if request.user == subtask.user:
            subtask.complete()
            data = {
                "id": subtask.id,
                "task": subtask.task.id,
                "title": subtask.title,
                "completed": subtask.completed
            }
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(
        methods=['put'],
        detail=True,
        permission_classes=[IsAuthenticated]
    )
    def uncomplete(self, request, pk=None):
        subtask = self.queryset.get(id=pk)
        if request.user == subtask.user:
            subtask.uncomplete()
            data = {
                "id": subtask.id,
                "task": subtask.task.id,
                "title": subtask.title,
                "completed": subtask.completed
            }
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

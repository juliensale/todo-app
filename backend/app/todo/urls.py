from django.urls import path, include

from rest_framework.routers import DefaultRouter

from todo import views

router = DefaultRouter()
router.register('lists', views.ListViewSet)
router.register('sublists', views.SubListViewSet)
router.register('tasks', views.TaskViewSet)
router.register('subtasks', views.SubTaskViewSet)

app_name = 'todo'

urlpatterns = [
    path('', include(router.urls))
]

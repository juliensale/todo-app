from rest_framework import serializers
from core.models import List, SubList


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = ('id', 'title', 'color')
        read_only_fields = ('id',)


class SubListSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubList
        fields = ('id', 'list', 'title')
        read_only_fields = ('id',)

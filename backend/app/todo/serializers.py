from rest_framework import serializers
from core.models import List


class ListSerializer(serializers.ModelSerializer):

    class Meta:
        model = List
        fields = ('id', 'title', 'color')
        read_only_fields = ('id',)

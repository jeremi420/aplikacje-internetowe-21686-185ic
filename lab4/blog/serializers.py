from rest_framework import serializers
from .models import Author, Post, Comment


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'first_name', 'last_name')
        model = Author


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'author', 'title', 'body', 'created_at')
        model = Post


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'post', 'name', 'email', 'body')
        model = Comment

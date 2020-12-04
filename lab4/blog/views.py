from rest_framework.viewsets import ModelViewSet
from rest_framework_extensions.mixins import NestedViewSetMixin
from .serializers import AuthorSerializer, PostSerializer, CommentSerializer
from .models import Author, Post, Comment


class AuthorViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = AuthorSerializer
    queryset = Author.objects.all()


class PostViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CommentViewSet(NestedViewSetMixin, ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

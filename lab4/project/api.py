from rest_framework_extensions.routers import NestedRouterMixin
from rest_framework.routers import DefaultRouter
from blog.views import AuthorViewSet, PostViewSet, CommentViewSet


class NestedDefaultRouter(NestedRouterMixin, DefaultRouter):
    pass


router = NestedDefaultRouter()
posts_router = router.register(r'posts', PostViewSet)
posts_router.register(
    r'comments',
    CommentViewSet,
    basename='post-comments',
    parents_query_lookups=['post']
)
authors_router = router.register(r'authors', AuthorViewSet)
authors_router.register(
    r'posts',
    PostViewSet,
    basename='author-books',
    parents_query_lookups=['author']
)
authors_router = router.register(r'comments', CommentViewSet)

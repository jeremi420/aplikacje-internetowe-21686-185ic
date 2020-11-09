from django.urls import path
from .views import PostList, PostDetail, PostDestroy


urlpatterns = [
    path('<int:pk>/destroy', PostDestroy.as_view()),
    path('<int:pk>/', PostDetail.as_view()),
    path('', PostList.as_view()),
]

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^', include('todos.urls')),
    url('admin/', admin.site.urls),
]

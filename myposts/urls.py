from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', post_list_create_list, name='posts'),
    path('hello/', hello_world_view, name='hello-world')

]
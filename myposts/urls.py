from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', post_list_create_list, name='posts'),
    path('hello/', hello_world_view, name='hello-world'),
    path('data/<int:num_posts>/', load_data_view, name='post-data')

]
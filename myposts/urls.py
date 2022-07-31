from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', post_list_create_list, name='posts'),
    path('data/<int:num_posts>/', load_data_view, name='post-data'),
    path('like/', like_unliked_post, name='liked-unliked' ),
    path('posts/<pk>/', post_details, name='details'),
    path('posts/<pk>/data/', post_detail_data_view, name="post-detail")

]
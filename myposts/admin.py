from django.contrib import admin
from profiles.models import Profiles
from .models import Post

admin.site.register(Profiles)
admin.site.register(Post)

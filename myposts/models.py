from django.db import models
from django.contrib.auth.models import User
from profiles.models import Profiles

class Post(models.Model):
    title = models.CharField(max_length=256)
    body = models.TextField()
    liked = models.ManyToManyField(User, blank=True)
    author = models.ForeignKey(Profiles, on_delete=models.CASCADE)
    updated= models.DateTimeField(auto_now=True)
    created= models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.title)

    @property
    def like_count(self):
        return self.liked.all().count()

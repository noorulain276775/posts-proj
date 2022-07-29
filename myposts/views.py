from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
# Create your views here.

def post_list_create_list(request):
    qs= Post.objects.all()
    return render(request, 'posts/main.html', {'qs': qs})

def hello_world_view(request):
    return JsonResponse({'text': 'hello-world'})

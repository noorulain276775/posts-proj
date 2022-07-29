from django.shortcuts import render
from .models import Post
from django.http import JsonResponse

def post_list_create_list(request):
    qs= Post.objects.all()
    return render(request, 'posts/main.html', {'qs': qs})

# Not the best solution
def load_data_view(request):
    qs = Post.objects.all()
    posts = []
    for obj in qs:
        item = {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'author': obj.author.user.username,
        }
        posts.append(item)
    return JsonResponse({'posts': posts})


def hello_world_view(request):
    return JsonResponse({'text': 'hello-world'})

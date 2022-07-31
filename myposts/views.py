from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from .forms import CreatePostForm
from profiles.models import Profiles


# The stackoverflow question that helped me 
# https://stackoverflow.com/questions/60942241/django-submit-button-not-working-on-ajax-request

def post_list_create_list(request):
    form = CreatePostForm(request.POST or None)
    if is_ajax(request):
        if form.is_valid():
            author = Profiles.objects.get(user=request.user)
            instance = form.save(commit=False)
            instance.author = author
            instance.save()
            return JsonResponse({
                'title': instance.title,
                'body': instance.body,
                'author': instance.author.user.username,
                'id': instance.id
            })
    context = {
        'form': form,
    }
    return render(request, 'posts/main.html', context)

# Not the best solution
def load_data_view(request, num_posts):
    if is_ajax(request):
        visible = 3
        upper = num_posts
        lower = upper - visible
        size = Post.objects.all().count()
        qs = Post.objects.all()
        posts = []
        for obj in qs:
            item = {
                'id': obj.id,
                'title': obj.title,
                'body': obj.body,
                'liked': True if request.user in obj.liked.all() else False,
                'count': obj.like_count,
                'author': obj.author.user.username,
            }
            posts.append(item)
        return JsonResponse({'posts': posts[lower:upper], 'size': size})

# deprecated, you can create a custom function to check the request type as
# Stackoverflow: https://stackoverflow.com/questions/70419441/attributeerror-wsgirequest-object-has-no-attribute-is-ajax

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

def like_unliked_post(request):
    if is_ajax(request):
        pk = request.POST.get('pk')
        obj= Post.objects.get(pk=pk)
        if request.user in obj.liked.all():
            liked = False
            obj.liked.remove(request.user)
        else:
            liked=True
            obj.liked.add(request.user)
        return JsonResponse({'liked': liked, 'count': obj.like_count})

def post_detail_data_view(request, pk):
    obj = Post.objects.get(pk=pk)
    data = {
        'id': obj.id,
        'title': obj.title,
        'body': obj.body,
        'author': obj.author.user.username,
        'logged_in': request.user.username,
        'created': obj.created,
        'updated': obj.updated
    }
    return JsonResponse({'data': data})



def post_details(request, pk):
    obj= Post.objects.get(pk=pk)
    form = CreatePostForm()

    context={
        'obj': obj,
        'form': form
    }
    return render(request, 'posts/details.html', context)


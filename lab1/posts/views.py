from django.shortcuts import render, get_object_or_404, redirect
from .forms import PostForm
from .models import Post
import logging


logger = logging.getLogger(__name__)

def post_list(request):
    return render(request, 'posts/post_list.html', {'posts': Post.objects.all()})


def post_detail(request, pk):
    return render(request, 'posts/post_detail.html', {'post': get_object_or_404(Post,pk=pk)})


def post_create(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm()
    return render(request, 'posts/post_edit.html', {'form': form})


def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        logger.info(post.title)
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            return redirect('post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'posts/post_edit.html', {'form': form})

def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)
    post.delete()
    return redirect('post_list')

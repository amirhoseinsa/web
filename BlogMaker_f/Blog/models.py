from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Super_b(models.Model):
    owner = models.ForeignKey(User, default=0)
    id = models.AutoField(primary_key='true')
    text = models.CharField(max_length=100)
    n = models.CharField(max_length=50)
    date = models.DateField(auto_now_add='true')

    def __str__(self):
        return str(self.n)


class Post(models.Model):
    blog = models.ForeignKey(Super_b, on_delete=models.CASCADE)
    t = models.CharField(max_length=50)
    text = models.CharField(max_length=200)
    time = models.DateField(auto_now_add='true')
    id = models.AutoField(primary_key='true')
    s = models.CharField(max_length=100)

    def __str__(self):
        return str(self.s)

    @staticmethod
    def create(blog, title, summary, text):
        return Post.objects.create(blog=blog, title=title, summary=summary, text=text)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=150)
    iid = models.IntegerField()
    time = models.DateField(auto_now_add='true')

    def __str__(self):
        return str(self.text)

    @staticmethod
    def create(post, text):
        return Comment.objects.create(post=post, text=text)

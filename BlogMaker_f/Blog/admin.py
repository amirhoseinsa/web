from django.contrib import admin

# Register your models here.
from Blog.models import Super_b, Comment, Post

admin.site.register(Super_b)
admin.site.register(Comment)
admin.site.register(Post)

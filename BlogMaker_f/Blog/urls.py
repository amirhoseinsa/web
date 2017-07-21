from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<blog_id>[0-9]+)/posts/', views.pg, name='get_posts'),
    url(r'^(?P<blog_id>[0-9]+)/post/', views.post_g, name='get_post'),
    url(r'^comments/', views.comment_g, name='get_comments'),
    url(r'^comment/', views.cm_add, name='add_comments'),
]
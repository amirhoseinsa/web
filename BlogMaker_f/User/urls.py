from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^login/', views.login, name='sign_in'),
    url(r'^register/', views.registe, name='sign_up'),
    url(r'^blog_id/', views.get_home_blog_id, name='get_home_blog_id'),
    url(r'^test/', views.t, name='test'),
]

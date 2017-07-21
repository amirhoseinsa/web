from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse

from Blog.models import Super_b
from User.forms import form_login, register, TestForm
from User.models import inf_u

# todo Upload images.


def registe(request):
    if request.method == 'POST':
        f = register(request.POST)
        res = {}
        if f.is_valid():
            username = f.cleaned_data["un"]
            password = f.cleaned_data["ps"]
            first_name = f.cleaned_data["fn"]
            last_name = f.cleaned_data["ln"]
            email = f.cleaned_data['email']
            if User.objects.filter(username=username).exists():
                res['status'] = -1
                res['message'] = 'user already exists'
                return JsonResponse(res)
            if len(password) < 5:
                res['status'] = -1
                res['message'] = 'too short password'
                return JsonResponse(res)
            else :
                print("else")
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            blog = Super_b.objects.create(owner=user, name='Home-' + user.username)
            user_info = inf_u.create_user_info(user, blog)
            res['status'] = 1
            res['message'] = 'Successfully Created User.'
            user.save()
            blog.save()
            user_info.save()
            return JsonResponse(res)
    else:
        print('Not a POST method')



def login(request):
    if request.method == 'POST':
        f = form_login(request.POST)
        res = {}
        if f.is_valid():
            un = f.cleaned_data["un"]
            psw = f.cleaned_data["ps"]
            user = authenticate(request, username=un, password=psw)
            if user is not None:
                login(request, user)
                print('logged in user', user.username)
                res['status'] = 1
                t = inf_u.objects.all().filter(user__username=un).first()
                res['token'] = t.token
                return JsonResponse(res)
            else:
                if User.objects.filter(username=un).exists():
                    res['status'] = -1
                    res['message'] = 'wrong password'
                else:
                    res['status'] = -1
                    res['message'] = 'user not found'
            return JsonResponse(res)
        else:
            res['status'] = -1
            res['message'] = 'Form is Not valid'
            return JsonResponse(res)

    else:
        print('Not a POST method')

def get_user(request):
    token = request.META.__getitem__('HTTP_X_TOKEN')
    user = inf_u.objects.filter(token=token).first()
    if user is not None:
        return user.user
    return None


def get_home_blog_id(request):
    if request.method == 'GET':
        user = get_user(request)
        if user is None:
            return JsonResponse({'status': -1, 'message': 'invalid token'})
        else:
            print("else")
        un = user.username
        blog = Super_b.objects.filter(owner__username=un).first()
        res = {'blog_id': blog.blog_id, 'name': blog.name}
        return JsonResponse(res)


def get_user(request):
    token = request.META.__getitem__('HTTP_X_TOKEN')
    user = inf_u.objects.filter(token=token).first()
    if user is not None:
        return user.user
    return None


def t(request):
    if request.method == 'POST':
        ans = {'status': 1}
        print(request.META.__getitem__('HTTP_X_TOKEN'))
        form = TestForm(request.POST)
        if form.is_valid():
            print('Its valid')
            post_id = form.cleaned_data["id"]
            text = form.cleaned_data['text']
            title = form.cleaned_data["t"]
            print(post_id, text, title)
        return JsonResponse(ans)

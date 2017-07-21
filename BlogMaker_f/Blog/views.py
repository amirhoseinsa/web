from django.http import JsonResponse


from Blog.forms import Post_f, Comment_f
from Blog.models import Post, Super_b, Comment
from User.models import inf_u


def pg(request, blog_id):
    res = {}
    u = get_user(request)
    if u is None:
        print('invalid')
        return JsonResponse({'status': -1, 'message': 'invalid'})
    else:
        print("else")
    print('In get posts', u)
    c = int(request.GET.get('count'))
    o = int(request.GET.get('offset'))
    ps = list(Post.objects.filter(blog__blog_id=blog_id).order_by('time'))[o:o + c]
    res['status'] = 1
    res['posts'] = []
    for p in ps:
        temp = {'datetime': p.time, 'id': p.post_id, 'title': p.title, 'summary': p.summary}
        res['posts'].append(temp)
    return JsonResponse(res)


def post_g(request, blog_id):
    if request.method == 'GET':
        u = get_user(request)
        if u is None:
            return JsonResponse({'status': -1, 'message': 'invalid token'})
        iddd = request.GET.get('id')
        p = Post.objects.filter(post_id=iddd).first()
        post = {'datetime': p.time, 'id': p.post_id, 'title': p.title, 'summary': p.summary, 'text': p.text}
        res = {'status': 1, 'post': post}
        return JsonResponse(res)
    if request.method == 'POST':
        f = Post_f(request.POST)
        if f.is_valid():
            t = f.cleaned_data['text']
            title = f.cleaned_data["t"]
            s = f.cleaned_data["s"]
            blog = Super_b.objects.filter(blog_id=blog_id).first()
            if blog is not None:
                post = Post.create(blog, title, s, t)
                post.save()
                return JsonResponse({'status': 1, 'message': 'Successfully Added The Post'})
    else:
        print("else")


def comment_g(request):
    res = {}
    u = get_user(request)
    if u is None:
        return JsonResponse({'status': -1, 'message': 'invalid token'})
    else:
        print("else")
    idd = request.GET.get('post_id')
    c = int(request.GET.get('count'))
    o = int(request.GET.get('offset'))
    post = Post.objects.filter(post_id=idd).first()
    comments = list(Comment.objects.filter(post=post).order_by('time'))[o:o + c]
    res['status'] = 1
    res['comments'] = []
    for c in comments:
        temp = {'datetime': c.time, 'text': c.text}
        res['comments'].append(temp)
    return JsonResponse(res)


# post_id text POST


def get_user(request):
    token = request.META.__getitem__('HTTP_X_TOKEN')
    user = inf_u.objects.filter(token=token).first()
    if user is not None:
        return user.user
    return None


def test(request):
    if request.method == 'POST':
        ans = {'status': 1}
        print(request.META.__getitem__('HTTP_X_TOKEN'))
       # form = TestForm(request.POST)
        if form.is_valid():
            print('Its valid')
            post_id = form.cleaned_data["id"]
            text = form.cleaned_data['text']
            title = form.cleaned_data["t"]
            print(post_id, text, title)
        return JsonResponse(ans)
def cm_add(request):
    if request.method == 'POST':
        u = get_user(request)
        if u is None:
            return JsonResponse({'status': -1, 'message': 'invalid token'})
        f = Comment_f(request.POST)
        if f.is_valid():
            print('form is valid')
            text = f.cleaned_data['text']
            idd = f.cleaned_data["id"]
            post = Post.objects.filter(post_id=idd).first()
            if post is not None:
                comment = Comment.create(post, text)
                comment.save()
                print(comment)
                ans = {'status': 1}
                temp = {'text': text, 'datetime': comment.time}
                ans['comment'] = temp
                print(ans)

                return JsonResponse({'status': 1, 'comment': ans})
        else:
            print('form is not valid')
    return JsonResponse({'status': -1, 'message': 'Under Construction'})

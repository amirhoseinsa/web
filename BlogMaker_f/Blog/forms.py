from django import forms


class Post_f(forms.Form):
    title = forms.CharField(max_length=150)
    summary = forms.CharField(max_length=150)
    text = forms.CharField(max_length=300)


class Comment_f(forms.Form):
    text = forms.CharField(max_length=300)
    post_id = forms.IntegerField()

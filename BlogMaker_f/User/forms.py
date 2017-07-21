from django import forms


class form_login(forms.Form):
    un = forms.CharField(label='', max_length=100,
                         widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    ps = forms.CharField(label='', widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))



class TestForm(forms.Form):
    idp = forms.IntegerField()
    text = forms.CharField(max_length=100)
    title = forms.CharField(max_length=100)


class register(forms.Form):
    un = forms.CharField(label='', max_length=100,
                         widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    fn = forms.CharField(label='', max_length=100, widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    ln = forms.CharField(label='', max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Last Name'}))
    psw = forms.CharField(label='', widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
    email = forms.CharField(label='', widget=forms.EmailInput(attrs={'placeholder': 'Email'}))


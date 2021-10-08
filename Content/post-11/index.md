---
path: "/how-to-send-confirmation-email-in-django"
date: "2021-10-08T05:32:02.068Z"
title: "How to send confirmation email in django"
author: "Abhishek Vaish"
tags: "python, django, confirmation email"
featuredImage: "./email.png"
---

## How To Send Confirmation Email In Django 3

First Configure The Settings
```py
if DEBUG:
	EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
	#to get email in cmd
```

create a token.py in same directory where the view function for registration is stored

```py
from django.contrib.auth.tokens import PasswordResetTokenGenerator

import six #pip install six
class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) +
            six.text_type(user.is_active)
        )
account_activation_token = TokenGenerator()



```

create user registraion form and store it in forms.py
```py
class UserRegisterationForm(UserCreationForm):
	email = forms.EmailField()
	first_name = forms.CharField(max_length=50)
	last_name = forms.CharField(max_length=50)

	class Meta:
		model = get_user_model()
		fields = ['first_name','last_name','email','password1','password2']
```
*Note that I have removed the user_name field for which I had to overwrite the base user class if you want you can add it.*


Now in Views.py
```py
from .forms import UserRegisterationForm
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token
from django.core.mail import EmailMessage


def register(request):
	form = UserRegisterationForm()
	if request.method == "POST":
		form = UserRegisterationForm(request.POST)
		if form.is_valid():
			user = form.save(commit=False)
			user.is_active = False
			user.save()
			current_site = get_current_site(request)
			mail_subject = 'Activate your blog account.'
			message = render_to_string('user/acc_active_email.html', {
			    'user': user,
			    'domain': current_site.domain,
			    'uid':urlsafe_base64_encode(force_bytes(user.pk)),
			    'token':account_activation_token.make_token(user),
			})
			to_email = form.cleaned_data.get('email')
			email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
			email.content_subtype = 'html'
			email.send()
			context ={
			'msg':'Please confirm your email address to complete the registration'
			}
			return render(request,'user/msg.html',context)
	return render(request, 'user/register.html',{'form':form})



def activate(request, uidb64, token):
	try:
		uid = force_text(urlsafe_base64_decode(uidb64))
		user = get_user_model().objects.get(pk=uid)
	except(TypeError, ValueError, OverflowError, User.DoesNotExist):
		user = None
	if user is not None and account_activation_token.check_token(user, token):
		user.is_active = True
		user.save()
		messages.success(request, "Your Account has been verified successfully you can go ahead and signIn")
		return redirect('login')
	else:
		context ={
		'msg':'Activation link is invalid!'
		}
		return render(request, 'user/msg.html',)

```

add path in urls.py
```py
path('activate/<uidb64>/<token>',views.activate, name='activate'),
```

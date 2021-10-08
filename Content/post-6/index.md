---
path: "/create-a-custom-user-model-in-django-3-with-email-as-the-default-username-field"
date: "2020-12-23T09:01:52.127Z"
title: "Create a custom user model in django-3 with email as the default username field"
author: "Abhishek Vaish"
tags: "python,django,user model"
featuredImage: "./django.jpg"
---


### Note : this needs to be done before applying any migrations to the database as we will be overwriting the default user model in django

<br>
create an app if don't have one

```
	python manage.py createapp user

```
<br>

now in user/models.py we first have to create our custom user model
```py

from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from PIL import Image # this is for profile image

class User(AbstractBaseUser):

	# custom fields  here

	email = models.EmailField(verbose_name='email',max_length=60,unique=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	img = models.ImageField(default='default.jpg')


	# these are compulsory fields

	date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
	is_admin = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)



	# this tells django to use email as login field

	USERNAME_FIELD = 'email'


	# you don't need to add email to required field

	REQUIRED_FIELDS = ['first_name','last_name']



	# it specify which manager to use when a user is created

	objects = UserManager()



	def __str__(self):
		return f"User : {self.email}"



	# Compulsory functions
	# For checking permissions. to keep it simple all admin have ALL permissons

	def has_perm(self, perm, obj=None):
		return self.is_admin


	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)

	def has_module_perms(self, app_label):
		return True



	# overwriting custom save to resize image 

	def save(self,*args,**kwargs):
		super(User,self).save(*args,**kwargs)
		img_reshaped = Image.open(self.img.path)
		img_reshaped =  img_reshaped.resize((225,225))
		img_reshaped.save(self.img.path)

```

<br>

### now we also need to add a manager to manage this model whenever a new user is created now in the same models.py add

```py
from django.db import models
from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
	''' 
	it is mandatory to overwrite create_user and creat_superuser function 
	'''
	def create_user(self,email,first_name,last_name,password):
		if not email:
			raise ValueError("User must have an email")
		if not first_name:
			raise ValueError("User must have a first name")
		if not last_name:
			raise ValueError("User must have a last name")
		if not password:
			raise ValueError("User must have a password")

		user = self.model(
			email=self.normalize_email(email),
			first_name=first_name,
			last_name=last_name,
		)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self,email,first_name,last_name,password):
		user = self.create_user(
			email=email,
			first_name=first_name,
			last_name=last_name,
			password=password
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user
```
<br><br>

So the complete **user/models.py** looks something like
```py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager
from PIL import Image

class UserManager(BaseUserManager):

	''' 
	it is mandatory to overwrite create_user and creat_superuser function 
	'''

	def create_user(self,email,first_name,last_name,password):
		if not email:
			raise ValueError("User must have an email")
		if not first_name:
			raise ValueError("User must have a first name")
		if not last_name:
			raise ValueError("User must have a last name")
		if not password:
			raise ValueError("User must have a password")

		user = self.model(
			email=self.normalize_email(email),
			first_name=first_name,
			last_name=last_name,
		)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self,email,first_name,last_name,password):
		user = self.create_user(
			email=email,
			first_name=first_name,
			last_name=last_name,
			password=password
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user



class User(AbstractBaseUser):

	# custom fields  here

	email = models.EmailField(verbose_name='email',max_length=60,unique=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	img = models.ImageField(default='default.jpg')



	# these are compulsory fields

	date_joined	= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
	last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
	is_admin = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)



	# this tells django to use email as login field

	USERNAME_FIELD = 'email'


	# you don't need to add email to required field

	REQUIRED_FIELDS = ['first_name','last_name']


	# it specify which manager to use when a user is created

	objects = UserManager()

	def __str__(self):
		return f"User : {self.email}"


	# Compulsory functions

	# For checking permissions. to keep it simple all admin have ALL permissons

	def has_perm(self, perm, obj=None):
		return self.is_admin


	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)

	def has_module_perms(self, app_label):
		return True


	# overwriting custom save to resize image

	def save(self,*args,**kwargs):
		super(User,self).save(*args,**kwargs)
		img_reshaped = Image.open(self.img.path)
		img_reshaped =  img_reshaped.resize((225,225))
		img_reshaped.save(self.img.path)


```

<br>

**Migrate the changes to the database**

```sh
	python manage.py makemigrations
	python manage.py migrate
```

<br>

### testing the model 
create a superuser using the shell
```
	python manage.py createsuperuser
```

<br>

### add the user model in admin panel 
In user/admin.py 
```py

from django.contrib import admin
from .models import User
admin.site.register(User)

```
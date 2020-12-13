---
path: "/post-2"
date: "2020-12-03T05:07:31.090Z"
title: "How To Deploy A Django App On Heroku"
author: "Abhishek Vaish"
featuredImage: "./django-heroku.jpg"
---

##### Step 1. Create a Procfile in your project root and add the following line.

```sh
	web: gunicorn your_project_name.wsgi
```

##### Step 2. Go to the command line and install psycopg2, gunicorn, django-heroku and create requirements.txt

```sh
	pip install psycopg2
	# And NOW… you’ll be able to install django-heroku 
	pip install gunicorn
	pip install django-heroku
	pip freeze > requirements.txt
```

##### Step 3. In your app/settings.py
```py
	import django_heroku 

	# Then all the way at the bottom of the file
	# ... 

	django_heroku.settings(locals()) 
```


##### Step 4. push it to heroku
```sh
	# login to your heroku
	heroku login

	# create new app if one doesn't yet exist
	heroku create

	# create a new postgres database for your app
	heroku addons:create heroku-postgresql:hobby-dev

	# migrate your database to the heroku app
	heroku run python manage.py migrate

	# before you do this, make sure to add your SECRET_KEY to your env variables in your heroku app settings
	git add .
	git commit -m "deploy to heroku "
	git push heroku master
```

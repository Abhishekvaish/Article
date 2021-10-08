---
path: "/create-and-delete-virtual-enirnonment-in-anaconda"
date: "2020-12-22T04:47:39.498Z"
title: "Create and delete virtual environment in anaconda(python)"
author: "Abhishek Vaish"
tags: "virtual environment,python,anaconda"
featuredImage: "./venv.jpg"
---
### In anaconda prompt 
#### Create a Virtual Environment 
```
	conda create -n name_of_your_env python=x.x
```
python=x.x can be any python version of your to get the latest version of python 3 you can just put python=3 

<br>

#### Activate a Virtual environment 
```
	conda activate name_of_your_env
```

<br>

#### Deactivate a Virtual environment 
```
	conda deactivate
```

<br>

#### Get the list of all environment
```
	conda env list
```

<br>

#### Delete a virtual environment
```
	conda env remove -n name_of_your_env
```

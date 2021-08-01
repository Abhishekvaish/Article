---
path: "/post-10"
date: "2021-08-01T03:05:01.408Z"
title: "How to use cookies in NodeJS"
author: "Abhishek Vaish"
tags: "NodeJS, express, HTTP cookies"
featuredImage: "./cookie.jpg"
---

# How to use cookies in NodeJS

Handling cookies is one of the most frustrating thing to waste time on figuring out what combinations of all the settings for a cookie works . So Here is a simple solution to save a lot of time and build what is actually important rather than getting CORS by the server.

### First let us install all our dependency using npm
```sh
	npm install express cors cookie-parser
```

### Import all the libraries and initialize express
```js
	const express = require('express')
	const cors = require('cors')
	const cookieParser = require('cookie-parser')

	const app = express()
```


### Intialize all the middlewares 
```js
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())

	app.use(cors({
		origin:'http://localhost:3000', // wherever your frontend is running
		credentials:true // tell the server to accepts cookies coming from client side
	}))

	app.use(cookieParser())

```

### Create a route to send cookies from server
```js
	app.get("/",(req,res)=>{

		res.cookie("name","Abhishek",{
			maxAge:1000*60,  // how long the cookie should stay on clients browser
			secure: 'false', // if you are using http use secure:'false' the false is in string
			sameSite:'none', // if the backend and frontend are running on different locations 
			httpOnly:'true' // if you want that the cookie cannot be access by using document.cookie on client side
		})
		res.sendStatus(200)
	})

	app.get("/cookie",(req,res)=>{
		console.log(req.cookies)
		res.sendStatus(200)
	})

```
### start the server
```js
	app.listen(8000, () => console.log("Server Is Online at port 8000"))
```

## Here is the entire server.js file
```js
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({
	origin:'http://127.0.0.1:3000',
	credentials:true
}))

app.use(cookieParser())


app.get("/",(req,res)=>{

	res.cookie("name","Abhishek",{
		maxAge:1000*60,
		secure: 'false',
		sameSite:'none',
		httpOnly:'true'
	})
	res.sendStatus(200)
})

app.get("/cookie",(req,res)=>{
	console.log(req.cookies)
	res.sendStatus(200)
})


app.listen(8000, () => console.log("Server Is Online at port 8000"))
```


---


## Client side

### Send request from the client side
> use credentials:'include' while using fetch and withcredentials:true while using axios
```js
	function getCookie(){
		fetch("http://localhost:8000",{
			credentials: 'include' // tells the browser to do both accept and send cookie 
		})
		.then(res => console.log(res.status))
	}

	function sendCookie(){
		fetch("http://localhost:8000/cookie",{
			credentials:'include'  // tells the browser to do both accept and send cookie 
		})
		.then(res => console.log(res.status))
	}
	
```
var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	id = require("uuid/v4"),
	bcrypt = require("bcrypt-nodejs"),
	app = express(),
	User = require("./user");

var currentUser;

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

function apiTokenCheck(req, res, next){
	var auth_token = req.body.token || req.get("token");
	User.findOne({"token": auth_token}, function(err, user) {
		if(err){
			console.log(err);
		} else{
			next();
		}
	});
}

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.get("/user", (req, res) => {
	res.render("user", {
		user: currentUser
	});
});

app.get("/data", apiTokenCheck, (req, res) =>{
	User.find({}, (err, user) =>{
		if(err){
			console.log(err);
		} else{
			res.json({
				"Success": true,
				"Reason": "API TOKEN GOOD"
			});
		}
	});
});

app.post("/login", (req, res) => {
	User.findOne({"username": req.body.username}, function(err, user){
		if(err){
			console.log(err);
		}else{
			if(bcrypt.compareSync(req.body.password, user.password)){			
			currentUser = user;
			res.redirect("/user");
			}else{
				res.json({
					"Success": false,
					"Reason": "Wrong username or password"
				});
			}
		}
	});
});

app.post("/signup", function(req, res) {
	new User({
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password),
		token: id()
	}).save (function(err) {
		if(err){
			console.log(err);
		}else{
			res.redirect("/login");
		}
	});
});

mongoose.connect("mongodb://localhost/api");
app.listen(8080);
console.log("Server is running!");
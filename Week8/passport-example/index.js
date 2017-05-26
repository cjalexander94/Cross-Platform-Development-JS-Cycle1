var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	hbs = require("hbs"),
	bcrypt = require("bcrypt-nodejs"),
	passport = require("passport"),
	session = require("express-session"),
	User = require("./user"),
	localAuth = require("./auth")
	app = express();

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(session({
	secret: 'itsASecret',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

localAuth(passport);

app.get("/", (req, res) =>{
	res.render("home");
});

app.get("/login", (req, res) =>{
	res.render("login");
});

app.get("/signup", (req, res) =>{
	res.render("signup");
});

app.get("/user", (req, res) =>{
	res.render("user", {
		user: req.user
	});
});

app.post("/login", passport.authenticate("local-login", {
	successRedirect: "/user",
	failureRedirect: "/login"
}));

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

app.get("/data", (req, res) =>{
	res.render("data");
});


mongoose.connect("mongodb://localhost/api");
app.listen(8080);
console.log("Server is running!");
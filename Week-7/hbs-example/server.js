var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	handleBars = require("hbs"),
	app = express(),
	User = require("./user");

var someUser;

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


app.get("/", (req, res) => {
	res.render("home");
})

app.get("/login", (req, res) => {
	res.render("login");
})

app.post("login", (req, res) => {
	User.findOne({"username": req.body.username}, (err, user) =>{
		if(err){
			console.log(err);
		}
		else{
			someUser = user;
			res.redirect("/data");
		}
	});
});

app.get("/signup",(req, res) => {
	res.render("signup");
})

app.post("/signup", (req, res) => {
	new User({
		username: req.body.username,
		password: req.body.password
	}).save((err) => {
		if(err){
			console.log(err);
		} else{
			res.redirect("/login");
		}
	});
});

app.get("/data",(req, res) => {
	res.render("data", {
		user: someUser
	});
});

mongoose.connect("mongodb://localhost/user")



app.listen(8080);
console.log("server is running");
var express = require("express"),
	ejs = require("ejs"),
	app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
		res.render("home");
	});

app.get("/login", (req, res) => {
		res.render("login");
	});

app.get("/signup", (req, res) => {
		res.render("signup");
	});

app.listen(8080, () => {
	console.log("Server is running!");
});
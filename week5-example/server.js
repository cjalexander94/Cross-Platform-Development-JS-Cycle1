require("dotenv").config();

var express = require("express");
var app = express();

app.get("/", (request, respond)=>{
	respond.json({
		"user": process.env.DB_USER,
		"pass": process.env.DB_PASS
	});

});

app.listen(8080);

console.log("Server is running");
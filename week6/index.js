var express = require("express");
var bodyParser = require("body-parser");
var sqlite = require("sqlite3").verbose();
var path = require("path");
var app = express();
var db = new sqlite.Database("firstDB");

db.serialize(function(){
	db.run("CREATE TABLE firstTable (name STRING, age INTEGER)")
})
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname,"index.html"));
})

app.post("/", (req, res) => {
	var data = {
		name: req.body.name,
		age: req.body.age
	};

	db.serialize(() => {
		db.run("INSERT INTO firstTable VALUES($name, $age)",{
			$name: data.name,
			$age: data.age
		}, () =>{
			res.redirect("/data");
		})
	})
})

app.get("/data", (req, res) =>{
	db.serialize(() => {
		db.get("SELECT * FROM firstTable", (err, rows) => {
			if(err){
				console.log(err);
			}
			else{
				res.json(rows);
			}
		});
	});
})

app.listen(8080);

console.log("Server is running");
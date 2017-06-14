var express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	ejs = require("ejs"),
	id = require("uuid/v4"),
	bcrypt = require("bcrypt-nodejs"),
	User = require("./user"),
	app = express();
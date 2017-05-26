var User = require("./user"),
	bcrypt = require("bcrypt-nodejs"),
	LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) =>{
	passport.serializeUser((user, done) =>{
		done(null, user);
	});

	passport.deserializeUser((id, done) => {
		done(null, id);
	});

	passport.use("local-login", new LocalStrategy({
		usernameField: "username",
		passwordField: "password",
		passReqToCallback: true
	}, (req, username, password, done) => {
		User.findOne({"username": username}, (err, user) =>{
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false);
			}
			if(!bcrypt.compareSync(password, user.password)){
				return done(null, false)
			}
			if(user && bcrypt.compareSync(password, user.password)){
				return done(null, user);
			}
		});
	}));
};
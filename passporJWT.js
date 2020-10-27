const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('./models/user');
// const env = require('../config/environment');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "failtell"
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    console.log("PAYLOAD : ",jwtPayLoad);
    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return done(err,false);}

        if (user){
            return done(null, user);
        }else{
            console.log('user not found from passport **********')
            return done(null, false);
        }
    })
}));

module.exports = passport;
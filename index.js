const express =require('express');
const passport = require('passport');
const passportJWT = require('./passporJWT');
const app = express() ;
const db = require('./mongoose');
const authController = require('./authcontroller');

app.get('/', passport.authenticate('jwt', {session: false}), authController.home)

app.post("/auth/local/new", authController.localCreate);
app.post("/auth/local/start", authController.localStart);
app.get("/auth/end", passport.authenticate('jwt', {session: false}), authController.end);

app.listen(8000,(err)=>{
    if(err){
        console.log('error in running server : ',err);
    }
    console.log(`server started at port 8000`);
})

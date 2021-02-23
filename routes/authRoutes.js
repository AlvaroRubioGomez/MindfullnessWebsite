var express = require('express');
var authRouter = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passportSetup');

//auth logout
authRouter.get('/logout', (req, res) => {
    //handle with passport
    req.logout();

    let curr_url = req.session.current_url;
    //Redirect home page
    if(curr_url == '/welcome' || curr_url == '/db/nextquestion' || curr_url == '/db/results'){
        res.redirect('/');
    }
    //Redirect prev url
    else{
        res.redirect(`${curr_url}`);
    }
});

//auth with google
authRouter.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google redirect
authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user);
    res.redirect('/welcome/');
})


module.exports = authRouter;
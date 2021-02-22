const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const dbConnection = require('./dbConnection');
const tools = require('../public/javascripts/tools');

let user; //user object container


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    let sql = `SELECT * from users WHERE id=${id}`;
    let query = dbConnection.query(sql, (err, results) =>{
        if(err) {
            throw err;
        } 
        //create user object
        user = tools.createUserObject(results);

        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback
        console.log(profile.id);
        console.log(profile.name.givenName);
        console.log(profile.name.familyName);
        //Check if user already exists
        let sql = `SELECT * from users WHERE googleId=${profile.id}`; 
        let query = dbConnection.query(sql, (err, results) =>{
            if(err) {
                throw err;
            } 
            //User already exists            
            if(results.length) {
                console.log('User already registered');

                //Create user object from db info
                user = tools.createUserObject(results);
                      
                //Serialize user               
                done(null, user);              

            }
            // Else, register new user
            else {   
                let post = {
                    googleId: profile.id,
                    givenName: profile.name.givenName, 
                    familyName: profile.name.familyName           
                };
            
                sql = 'INSERT INTO users SET ?';
                query = dbConnection.query(sql, post, err =>{
                    if(err){
                        throw err;
                    }          
                    console.log('New user registered' );     
                });  

                //Retrieve user information from db 
                //(it serves as a checker as well as for retrieving the id)
                sql = `SELECT * from users WHERE googleId=${profile.id}`; 
                query = dbConnection.query(sql, (err, results) =>{
                    if(err) {
                        throw err;
                    } 
                    //Create user object from db info
                    user = tools.createUserObject(results);

                    //Serielize user
                    done(null, user)
                });                               
            } 
        })
    })
)



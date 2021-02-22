var express = require('express');
var router = express.Router();

const authCheck = (req, res, next) =>{
  if(!req.user){
    //if user is not logged in
    res.redirect('/login');
  }
  else{
    //if logged in 
    next();
  }
};

router.get('/', authCheck, function(req, res, next) {    
  res.render('welcome', {user: req.user, url: req.originalUrl});  
});

module.exports = router;

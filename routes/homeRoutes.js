var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 
  //Store current url
  req.session.current_url =  req.originalUrl;
  
  res.render('home', {user: req.user, url: req.originalUrl});  
});

module.exports = router;

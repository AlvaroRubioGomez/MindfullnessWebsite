var express = require('express');
var router = express.Router();

//Render login view
router.get('/', function(req, res, next) {
  res.render('login', {user: req.user, url: req.originalUrl});
});


module.exports = router;

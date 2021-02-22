var express = require('express');
var router = express.Router();
var path = require('path');

//render about page
router.get('/', function(req, res, next) {
  res.render('about', {url: req.originalUrl});
});

//handle download CV
router.get('/downloadCV', function (req, res) {
  var file = path.join(__dirname, '../public/files/AlvaroRubio_CV.pdf');
  res.download(file, function (err) {
      if (err) {
          console.log("Error");
          console.log(err);
      } else {
          console.log("Success");
      }
  });
});


module.exports = router;

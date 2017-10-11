var express = require('express');
var router = express.Router();

var courses = require('./../data/courses');

router.get('/', function(req, res) {
  res.redirect(`courses/${courses[0].id}`);
});

module.exports = router;
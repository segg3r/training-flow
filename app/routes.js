var _ = require('underscore');
var express = require('express');
var router = express.Router();

var courses = require('./data/courses');

router.get('/', function(req, res) {
  res.render('index', commonContent());
});

router.get('/courses/:courseId', function(req, res) {
  var courseId = parseInt(req.params.courseId);
  var course = _.findWhere(courses, { id: courseId });

  var content = _.extend(commonContent(), {
    title: course.name,
    course: course
  });
  res.render('course', content);
});

router.get('/courses/:courseId/lessons/:lessonId', function(req, res) {
  var courseId = parseInt(req.params.courseId);
  var lessonId = parseInt(req.params.lessonId);

  var course = _.findWhere(courses, { id: courseId });
  var lesson = _.findWhere(course.lessons, { id: lessonId });

  var content = _.extend(commonContent(), {
    title: course.name,
    course: course,
    lesson: lesson
  });
  res.render('lesson', content);
});

module.exports = router;

function commonContent() {
  return {
    user: {
      id: 1,
      name: 'Student Epama',
      avatar: '/images/student.jpg'
    },
    courses: courses
  };
}
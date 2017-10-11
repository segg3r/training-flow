var _ = require('underscore');
var express = require('express');
var router = express.Router();

var courses = require('./data/courses');

router.get('/', function(req, res) {
  res.redirect(`courses/${courses[0].id}`);
});

router.get('/courses/:courseId', function(req, res) {
  var courseId = parseInt(req.params.courseId);
  var course = _.findWhere(courses, { id: courseId });

  var content = _.extend(commonContent(), {
    title: course.name,
    course: course
  });

  if (course.state === 'no_integration') {
    res.redirect(`/courses/${courseId}/registration/step/1`);
  } else {
    res.redirect(`/courses/${courseId}/lessons/${course.lessons[course.current_lesson_index].id}`);
  }
});

router.post('/courses/:courseId/register', function(req, res) {
  var courseId = parseInt(req.params.courseId);
  var course = _.findWhere(courses, { id: courseId });

  course.state = 'in_progress';
  course.lessons[0].state = 'in_progress';

  setTimeout(function() {
    res.send('ok');
  }, 3000);
});

router.get('/courses/:courseId/registration/step/:stepId', function(req, res) {
  var courseId = parseInt(req.params.courseId);
  var stepId = parseInt(req.params.stepId);
  var course = _.findWhere(courses, { id: courseId });

  var content = _.extend(commonContent(), {
    title: course.name,
    course: course,
    stepId: stepId
  });
  res.render('course_registration_' + stepId, content);
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

router.post('/courses/:courseId/lessons/:lessonId/submit', function(req, res) {
  var courseId = parseInt(req.params.courseId);
  var lessonId = parseInt(req.params.lessonId);

  var course = _.findWhere(courses, { id: courseId });
  var lesson = _.findWhere(course.lessons, { id: lessonId });
  lesson.state = 'completed';

  if (course.current_lesson_index < course.lessons.length - 1) {
    course.lessons[++course.current_lesson_index].state = 'in_progress';
  }

  setTimeout(function() {
    res.send('ok');
  }, 3000);
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
var _ = require('underscore');
var express = require('express');
var router = express.Router();

var session = require('./../services/session');
var courseService = require('./../services/courseService');

var users = require('./../data/users');

// TODO get from session
var userId = users[0].id;

router.get('/:courseId', function(req, resp) {
  var courseId = parseInt(req.params.courseId);

  Promise.all([
    courseService.getCourse(courseId),
    courseService.getCourseSubscription(courseId, userId)
  ]).then(function(res) {
    var course = res[0];
    var subscription = res[1];

    if (!subscription) {
      resp.redirect(`/courses/${courseId}/registration/step/1`);
    } else {
      resp.redirect(`/courses/${courseId}/lessons/${subscription.currentLesson}`);
    }
  });
});

router.post('/:courseId/register', function(req, resp) {
  var courseId = parseInt(req.params.courseId);
  courseService.subscribeToCourse(courseId, userId)
    .then(() => {
      resp.send('ok');
    });
});

router.get('/:courseId/registration/step/:stepId', function(req, resp) {
  var courseId = parseInt(req.params.courseId);
  var stepId = parseInt(req.params.stepId);
  
  Promise.all([
    session.get(),
    courseService.getCourse(courseId)
  ]).then((res) => {
    var session = res[0];
    var course = res[1];

    var content = _.extend(session, {
      title: course.name,
      course: course,
      stepId: stepId
    });

    resp.render('course_registration_' + stepId, content);
  });
});

router.get('/:courseId/lessons/:lessonId', function(req, resp) {
  var courseId = parseInt(req.params.courseId);
  var lessonId = parseInt(req.params.lessonId);

  Promise.all([
    session.get(),
    courseService.getCourse(courseId),
    courseService.getLesson(lessonId),
    courseService.getLessonState(lessonId, userId)
  ]).then((res) => {
    var session = res[0];
    var course = res[1];
    var lesson = res[2];
    var lessonState = res[3];

    var lessonExtended = _.extend(lesson, lessonState);

    var content = _.extend(session, {
      title: course.name,
      course: course,
      lesson: lessonExtended
    });
    resp.render('lesson', content);
  });
});

router.post('/:courseId/lessons/:lessonId/submit', function(req, resp) {
  var courseId = parseInt(req.params.courseId);
  var lessonId = parseInt(req.params.lessonId);

  courseService.completeLesson(courseId, lessonId, userId)
    .then(() => {
      setTimeout(function() {
        resp.send('ok');
      }, 3000);
    });
});

module.exports = router;
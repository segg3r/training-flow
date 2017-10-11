var _ = require('underscore');

var users = require('./../data/users');
var courseService = require('./courseService');

var userId = users[0].id;

var Session = function() {
    var self = this;

    self.get = function() {
        return self.getCourses()
            .then((courses) => {
                return {
                    user: users[0],
                    courses: courses
                };
            });
    };

    self.getCourses = function() {
        return Promise.all([
            courseService.getAllCourses(),
            courseService.getAllLessons(),
            courseService.getUserCourseSubscriptions(userId),
            courseService.getUserLessonStates(userId)
        ]).then((res) => {
            var allCourses = res[0];
            var allLessons = res[1];
            var subs = res[2];
            var lessonStates = res[3];

            allLessons = allLessons.map((lesson) => {
                var lessonState = _.findWhere(lessonStates, {
                    lessonId: lesson.id
                });
                return lessonState ? _.extend(lesson, lessonState) : lesson;
            });

            allCourses = allCourses.map((course) => {
                var sub = _.findWhere(subs, {
                    courseId: course.id
                });

                if (sub) {
                    course = _.extend(course, sub);
                } else {
                    course.state = 'no_integration';
                }

                course.lessons = allLessons.filter((lesson) => {
                    return lesson.courseId = course.id;
                });
                return course;
            });

            return allCourses;
        }); 

    };
};

module.exports = new Session();
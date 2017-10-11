var _ = require('underscore');

var courses = require('./../data/courses');
var courseSubscriptions = require('./../data/course_subscriptions');
var lessons = require('./../data/lessons');
var lessonStates = require('./../data/lesson_states');

var CourseService = function() {
    var self = this;

    self.getAllCourses = function() {
        return Promise.resolve(courses);
    };

    self.getAllLessons = function() {
        return Promise.resolve(lessons);
    };

    self.getUserCourseSubscriptions = function(userId) {
        return Promise.resolve(courseSubscriptions.filter((sub) => {
            return sub.userId === userId;
        }));
    };

    self.getUserLessonStates = function(userId) {
        return Promise.resolve(lessonStates.filter((lesson) => {
            return lesson.userId === userId;
        }));
    };

    self.getCourse = function(courseId) {
        return Promise.resolve(_.findWhere(courses, {
            id: courseId
        }));
    };

    self.getCourseSubscription = function(courseId, userId) {
        return Promise.resolve(_.findWhere(courseSubscriptions, {
            courseId : courseId,
            userId : userId
        }));
    };

    self.getLesson = function(lessonId) {
        return Promise.resolve(_.findWhere(lessons, {
            id: lessonId
        }));
    };

    self.getLessonState = function(lessonId, userId) {
        return Promise.resolve(_.findWhere(lessonStates, {
            lessonId: lessonId,
            userId: userId
        }));
    };

    self.getLessons = function(courseId) {
        return Promise.resolve(lessons.filter((lesson) => {
            return lesson.courseId === courseId;
        }));
    };

    self.completeLesson = function(courseId, lessonId, userId) {
        return Promise.all([
            self.getCourseSubscription(courseId, userId),
            self.getLessonState(lessonId, userId),
            self.getLessons(courseId)
        ]).then((res) => {
            var courseSubscription = res[0];
            var lessonState = res[1];
            var lessons = res[2];

            lessonState.state = 'completed';
            var currentLessonIndex = _.findIndex(lessons, (lesson) => {
                return lesson.id === lessonId;
            });
            
            if (currentLessonIndex < lessons.length - 1) {
                self.startLesson(courseId, lessons[currentLessonIndex + 1].id, userId);
            }
        });
    };

    self.startLesson = function(courseId, lessonId, userId) {
        return self.getCourseSubscription(courseId, userId)
            .then((courseSubscription) => {
                courseSubscription.currentLesson = lessonId;

                lessonStates.push({
                    courseId: courseId,
                    userId: userId,
                    lessonId: lessonId,
                    state: 'in_progress',
                    feedback: []
                });
            });
    };

    self.subscribeToCourse = function(courseId, userId) {
        return self.getLessons(courseId)
            .then((lessons) => {
                courseSubscriptions.push({
                    courseId: courseId,
                    userId: userId,
                    state: 'in_progress'
                });

                return self.startLesson(courseId, lessons[0].id, userId);
            });
    };
};

module.exports = new CourseService();
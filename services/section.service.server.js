module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        console.log('Session validation check, current user : ', currentUser);
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function(enrollments) {
                res.json(enrollments);
            });
        console.log("Enrolled");
    }

    function enrollStudentInSection(req, res) {
        console.log('ok on server');
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        // console.log('Enroll', enrollment);
        // // res.json(enrollment);
        // enrollmentModel.enrollStudentInSection(enrollment)
        //     .then(function(enrollment) {
        //         res.json(enrollment);
        //     })

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function deleteSection(req, res) {
        var id = req.params['sectionId'];
        sectionModel.deleteSection(id)
            .then(function (section) {
                res.send(section);
            });
    }

    function updateSection(req, res) {
        var sectionId = req.params['sectionId'];
        var section = req.body;
        console.log('Section body : ', section);
        sectionModel.updateSection(sectionId, section)
            .then(function (section) {
                res.send(section);
            });
    }
};
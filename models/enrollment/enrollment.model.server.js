var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function unEnrollStudentInSection(enrollmentId) {
    return enrollmentModel.remove({_id: enrollmentId});
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function findEnrollmentByCredentials(credentials) {
    return enrollmentModel.findOne(credentials, {student: 1, section: 1});
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
    unEnrollStudentInSection: unEnrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
    findEnrollmentByCredentials: findEnrollmentByCredentials,
};
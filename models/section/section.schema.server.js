var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
    name: String,
    seats: Number, // available seats
    maxSeats: Number,
    courseId: Number,
    students: [String]
}, {collection: 'section'});
module.exports = sectionSchema;
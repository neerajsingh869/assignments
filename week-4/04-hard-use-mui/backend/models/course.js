const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    imageLink: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
})

// COLLECTION NAME => courses -> which contains documents
// that follows courseSchema

// MODEL NAME => Course -> which will interate with
// 'courses' collection to do CRUD operations
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
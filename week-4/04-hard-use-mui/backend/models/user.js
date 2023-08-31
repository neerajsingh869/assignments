const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

// COLLECTION NAME => users -> which contains documents
// that follows userSchema

// MODEL NAME => User -> which will interate with
// 'users' collection to do CRUD operations
const User = mongoose.model('User', userSchema);

module.exports = User;
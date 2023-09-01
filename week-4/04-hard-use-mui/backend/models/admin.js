const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
});

// COLLECTION NAME => admins -> which contains documents
// that follows adminSchema

// MODEL NAME => Admin -> which will interate with
// 'admins' collection to do CRUD operations
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
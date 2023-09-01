const mongoose = require('mongoose');

// establish intial connection with db and listen
// for initial error
mongoose.connect('mongodb+srv://nsingh:M1voCmaVNGwgruws@cluster0.oibuqbf.mongodb.net/course_sell_dev').then(() => {
    console.log("DB is connected succussfully.");
}).catch(err => {
    console.log(err);
});

// listen for error after connection has been made
mongoose.connection.on('error', err => {
    console.log(err);
});
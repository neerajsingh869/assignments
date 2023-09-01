// import necessary libaries
const express = require('express');
const db = require('./config/mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rootRouter = require('./routes/index');

// define constant variables
const app = express();
const PORT = 3000;

// use necessary middleware
app.use(cors());
app.use(express.json());

// redirect all incoming routes to rootRouter
app.use('/', rootRouter);

// start server and listen to incoming request
app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`App server is running on port ${PORT}`);
})
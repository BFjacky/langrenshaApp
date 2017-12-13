/*
   
*/
const mongoose = require('mongoose');
DBURL = 'mongodb://localhost:27017/langrensha';
mongoose.connect(DBURL);

mongoose.connection.on('connected', function () {
    console.log('neaulib Mongoose connection open to ' + DBURL);
});

mongoose.connection.on('error', function (err) {
    console.log('neaulib Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('neaulib Mongoose connection disconnected');
});

module.exports = mongoose;

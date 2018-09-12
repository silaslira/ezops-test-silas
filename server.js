var express = require('express');
var mongoose = require('mongoose');

var app = express();

var dbUrl = 'mongodb://messages:M2r4T7aA3G2@ds255332.mlab.com:55332/messages';

var Message = mongoose.model('Message', { name : String, message : String});

mongoose.connect(dbUrl , (err) => {
    console.log('mongodb connected', err);
});

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));

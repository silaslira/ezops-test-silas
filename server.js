/**
 *  Imports
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var io = require('socket.io');


/**
 * Set up
 */

var app = express();

var dbUrl = 'mongodb://messages:M2r4T7aA3G2@ds255332.mlab.com:55332/messages';

var Message = mongoose.model('Message', { name : String, message : String});

mongoose.connect(dbUrl , (err) => {
    console.log('mongodb connected', err);
});

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/**
 * API
 */

app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
});

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
});

app.delete('/messages/:messageId', (req, res) => {
    let obj = {_id: req.params.messageId};
    var message = new Message(obj);
    message.delete((err) =>{
        if(err)
            sendStatus(500);
        io.emit('deletion', obj._id);
        res.sendStatus(200);
    })
});


/**
 * Start up
 */

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});


/**
 * Socket
 */

io = io.listen(server);

io.on('connection', () =>{
    console.log('a user is connected');
});


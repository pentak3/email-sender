var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var Config = require('./Config');
var Emailer = require('./routes/Emailer');

//console.log(Config);

var app = express();
app.set('port', 3000);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())

//All Allowed Routes
app.post('/emails', Emailer.sendEmail);

//Default Error
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).send(err.message);
});

var server = app.listen(app.get('port'), function () {
	console.log('Server Up on Port: %s', server.address().port);
})
var express = require('express');
var router = express.Router();

// require application modules
var storage = require('storage');
var msgValidator = require('messageValidator');

// POST sensors messages
router.post('/messages', function(req, res, next) {

	// create the message document from request
	var sensorMessage = {id : req.body.id, timestamp: req.body.timestamp, sensorType: req.body.sensorType, value: req.body.value};

	// validate incoming message data
	msgValidator.validate(sensorMessage, function(err) {
		if(err) {
			res.status(400).json(err);
		}
	});

	// convert date to millisecond for storage
	// TODO : homegenize date format with storage for date comparison 
	var ts = req.body.timestamp;
	sensorMessage.timestamp = Date.parse(ts);

	// store message
	storage.addMessage(sensorMessage, function(err,message) {
		if (err) {
			// return error (duplicated message id for instance)
			res.status(403).end();
		} else {
			// send back saved data
			var responseMessage = {id : message.id, timestamp: ts, sensorType: message.sensorType, value: message.value};
			res.send(responseMessage);
		}
	});
});

// export message routes
module.exports = router;

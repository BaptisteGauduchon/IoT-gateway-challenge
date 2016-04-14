var express = require('express');
var router = express.Router();

// require storage service
var storage = require('storage');

// POST sensors messages
router.post('/messages', function(req, res, next) {

	// create the message document & date conversion to milliseconds for storage
	var ts = req.body.timestamp;
	var sensorMessage = {id : req.body.id, timestamp: Date.parse(ts), sensorType: req.body.sensorType, value: req.body.value};

	// store message
	storage.addMessage(sensorMessage, function(err,message) {
		if (err) {
			// return error (duplicated message id for instance)
			res.status(403).end();
		} else {
			// send back saved data
			var responseMessage = {id : message.id, timestamp: ts, sensorType: message.timestamp, value: message.value};
			res.send(responseMessage);
		}
	});
});

// export message routes
module.exports = router;

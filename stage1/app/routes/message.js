var express = require('express');
var router = express.Router();

// require storage service
var messages = require('storage').messages

// POST sensors message
router.post('/messages', function(req, res, next) {
	// create the document object to be stored
	var sensorMessage = {id : req.body.id, timestamp: Date.parse(req.body.timestamp), sensorType: req.body.sensorType, value: req.body.value};
	var messageId = {id : req.body.id};

	// if message ID is UID, persist message in db
	if (messages.insert(sensorMessage)) {
		res.send(sensorMessage);
	} else {
		// return error on duplicated message id
		res.status(403).end();
	}
});

// export message routes
module.exports = router;

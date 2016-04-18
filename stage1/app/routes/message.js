var express = require("express");
var router = express.Router();

// require application modules
var storage = require("storage");
var msgValidator = require("messageValidator");

// POST sensors messages
router.post("/messages", function(req, res, next) {

	// validate incoming message data
	msgValidator.validate(req.body, function(err) {
		if(err) {
			next({status : 400, message : err});
		} else {
			// create the message document from request & convert date to millisecond for storage
			var sensorMessage = {
				id : req.body.id,
				timestamp: Date.parse(req.body.timestamp),
				sensorType: req.body.sensorType,
				value: req.body.value
			};

			// store message
			storage.addMessage(sensorMessage, function(err) {
				if (err) {
					// return error (duplicated message id for instance)
					next({status : 403, message : err});
				} else {
					res.end();
				}
			});
		}
	});
});

// export message routes
module.exports = router;

var express = require('express');
var router = express.Router();

// one hour in milliseconds
const oneHourInMillis = 1000*60*60;

// require storage service
var storage = require('storage');

// GET sensors synthesis
router.get('/messages/synthesis', function(req, res, next) {

	// get last hour messages
	storage.getLastMessages(oneHourInMillis, function(err, messages) {

		if (err) {
			res.status(404).json({error:err});
		} else {
			// groupe messages by sensor type
			// TODO direclty while storage query (is it possible with lokiJS ?)
			var sortedMessages = [];
		    var sensorType = {};
		    var i;
		    var j;
		    var currentMessage;
		    for (i = 0, j = messages.length; i < j; i++) {
		        currentMessage = messages[i];
		        if (!(currentMessage.sensorType in sensorType)) {
		            sensorType[currentMessage.sensorType] = {sensorType: currentMessage.sensorType, messages: []};
		            sortedMessages.push(sensorType[currentMessage.sensorType]);
		        }
		        sensorType[currentMessage.sensorType].messages.push(currentMessage);
		    }

		    // calculate min / max / avg
		    // TODO : prototypes for max / min / average in modules !
		    var synthesis = [];
		    sortedMessages.forEach(function(messagesGroupedBySensorType) {
		    	var messagesList = messagesGroupedBySensorType.messages;
				var maxValue = Math.max.apply(Math,messagesList.map(function(message){return message.value;}));
				var minValue = Math.min.apply(Math,messagesList.map(function(message){return message.value;}));
				var sum = 0;
				messagesList.forEach(function(message) {
					sum += message.value;
				});
				var average = sum / messagesList.length;
				// synthesis for current sensors type
				synthesis.push(
					{
						sensorType: messagesGroupedBySensorType.sensorType,
					 	minValue : minValue,
					  	maxValue: maxValue,
					    mediumValue: average,
					});
		    });

		    // return synthesis list
  			res.json(synthesis);
		}
	});
});

// export synthesis routes
module.exports = router;

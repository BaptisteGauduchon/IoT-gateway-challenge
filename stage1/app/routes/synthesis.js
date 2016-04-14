var express = require('express');
var router = express.Router();

// require storage service
var messages = require('storage').messages

const oneHourInMillis = 1000*60*60;

// GET sensors synthesis
router.get('/messages/synthesis', function(req, res, next) {

	// calculate mimimum timestamp
	var nowMillis = new Date().getTime();
	var lasHourMillis = nowMillis - oneHourInMillis;

	// get last hour messages
	var queryLasHourMessages = {'timestamp': {'$gte' : lasHourMillis}};
	var validMessages = messages.find(queryLasHourMessages);

	// groupe message by sensor type
	var sortedMessages = [];
    var sensorType = {};
    var i;
    var j;
    var currentMessage;

    for (i = 0, j = validMessages.length; i < j; i++) {
        currentMessage = validMessages[i];
        if (!(currentMessage.sensorType in sensorType)) {
            sensorType[currentMessage.sensorType] = {sensorType: currentMessage.sensorType, messages: []};
            sortedMessages.push(sensorType[currentMessage.sensorType]);
        }
        sensorType[currentMessage.sensorType].messages.push(currentMessage);
    }

    // calculate min / max / avg
    // TODO : prototypes 
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
});

// export synthesis routes
module.exports = router;

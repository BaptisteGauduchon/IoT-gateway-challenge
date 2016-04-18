// message API test
describe("Messages", function() {
	describe("POST", function() {

		// testing message value insert
		it("should respond with HTTP status code 200 on message insertion", function(done) {
			var message = {"id":"abcd1234", "timestamp":new Date().toISOString(), "sensorType":1, "value":1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(200,done)
		});

		// testing message id unique constraint
		it("should respond with HTTP status code 403 when [message.id] isn\"t unique", function(done) {
			var message = {"id":"abcd1234", "timestamp":new Date().toISOString(), "sensorType":1, "value":1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(403,done)
		});

		// testing message format validation
		it("should respond with HTTP status code 400 on bad [message.id] format", function(done) {
			var message = {"id":1, "timestamp":new Date().toISOString(), "sensorType":1, "value":1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on bad [message.timestamp] format", function(done) {
			var message = {"id":"abcd12345", "timestamp":45654654654, "sensorType":1, "value":1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on bad [message.sensorType] format", function(done) {
			var message = {"id":"abcd12346", "timestamp":new Date().toISOString(), "sensorType":"1", "value":1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on bad [message.value] format", function(done) {
			var message = {"id":"abcd12347", "timestamp":new Date().toISOString(), "sensorType":1, "value":"1"};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});

		// testing message values validation
		it("should respond with HTTP status code 400 on wrong [message.id] data", function(done) {
			var message = {"id":"abcd1234!", "timestamp":new Date().toISOString(), "sensorType":1, "value": 1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on wrong [message.timestamp] data", function(done) {
			var message = {"id":"abcd12348", "timestamp":"216-04-15T16:43:00.00Z", "sensorType":1, "value": -1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on wrong [message.sensorType] data", function(done) {
			var message = {"id":"abcd12349", "timestamp":new Date().toISOString(), "sensorType":-2147483649, "value": 1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on wrong [message.sensorType] data", function(done) {
			var message = {"id":"abcd123410", "timestamp":new Date().toISOString(), "sensorType":2147483648, "value": 1};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on wrong [message.value] data", function(done) {
			var message = {"id":"abcd123411", "timestamp":new Date().toISOString(), "sensorType":1, "value": -9223372036854777000};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
		it("should respond with HTTP status code 400 on wrong [message.value] data", function(done) {
			var message = {"id":"abcd123412", "timestamp":new Date().toISOString(), "sensorType":1, "value": 9223372036854777000};
			request(app)
				.post("/messages")
				.send(message)
				.expect(400,done)
		});
	});
});

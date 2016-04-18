// Synthesis API test
describe('Synthesis', function () {
  describe('GET at /messages/synthesis', function () {
    it('should respond with HTTP status code 200', function (done) {
      request(app)
        .get('/messages/synthesis')
        .set('Accept', 'application/json')
        .expect(200, done)
    })
    it('should return good synthesis data', function (done) {
      request(app)
        .get('/messages/synthesis')
        .set('Accept', 'application/json')
        .expect(200, [{'sensorType': 1,'minValue': 1,'maxValue': 1,'mediumValue': 1}], done)
    })
  })
})

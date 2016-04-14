const port = process.env.PORT || 8080;

var express = require('express');
var bodyParser = require('body-parser');
var synthesis = require('./routes/synthesis');
var message = require('./routes/message');

var app = express();

/* support JSON encoded request bodies */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

/* use routes */
app.use('/', synthesis);
app.use('/', message);

/* start server */
app.listen(port, function () {
  console.log('listening at %d', port);
});
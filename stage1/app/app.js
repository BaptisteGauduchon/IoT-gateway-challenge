var express = require("express");
var bodyParser = require("body-parser");
var synthesis = require("./routes/synthesis");
var message = require("./routes/message");
var app = express();
var port = process.env.PORT || 8080;

// support JSON encoded request bodies only
app.use(bodyParser.json());

// use routes
app.use("/", synthesis);
app.use("/", message);

// error logger
app.use(function(err, req, res, next) {
	console.error("an error occured : ");
	console.error(err);
	next(err);
});

// catch-all error handler
app.use(function(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	res.status(err.status || 500).json({error : err});
});

// start server
app.listen(port, function () {
	console.log("listening at %d", port);
});

// export express application
module.exports = app;
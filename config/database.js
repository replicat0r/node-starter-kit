const mongoose = require('mongoose');
module.exports = function(dbconfig) {
	mongoose.connect(dbconfig);

	mongoose.connection.on("connected", function() {
		console.log('Connected Successfully to MongoDb');
	});
	mongoose.connection.on("error", function(err) {
		console.error('Failed to connect to DB on startup ', err);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose default connection to DB  disconnected');
	});

};
	var VersionSetterMiddleware = App.require("app/middleware/versionSetter")
	var HeartbeatController = App.require("app/controllers/heartbeatController")


	 module.exports = function(app, config) {


	    app.all('/*', VersionSetterMiddleware())

	    app.get('/heartbeat', HeartbeatController.index)

	}
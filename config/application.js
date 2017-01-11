var env = process.env.NODE_ENV || 'development',
    packageJson = require("../package.json"),
    express = require("express"),
    fs = require("fs"),
    path = require('path'),
    morgan = require('morgan')


console.log("Loading App in " + env + " mode.")

global.App = {
    app: express(),
    config: require("./config"),
    version: packageJson.version,
    port: process.env.PORT || 3000,
    root: path.normalize(__dirname + '/..') || process.cwd(),
    require: function(path) {
        return require(this.appPath(path))
    },
    appPath: function(path) {
        return this.root + "/" + path
    },
    command: function(path) {
        return this.require("app/commands/" + path)
    },
    controller: function(path) {
        return this.require("app/controllers/" + path + "Controller")
    },
    model: function(path) {
        return this.require("app/models/" + path)
    },
    presenter: function(path) {
        return this.require("app/presenters/" + path)
    },
    route: function(path) {
        return this.require("app/routes/" + path)
    },
    util: function(path) {
        return this.require("app/utils/" + path)
    },
    log: function() {
        if (process.env.V) {
            console.log.apply(console, arguments)
        }
    },
    env: env,
    start: function() {
        App.require('config/express')(App.app, App.config);
        //App.require("config/database.js")(App.config.db);

        if (!App.config) {
            App.logger.trace("ERROR: No config specified for " + env + " environment.")
            process.exit(1)
        }


        if (!this.started) {
            this.started = true
            this.app.listen(this.port)
            console.log("Running App Version " + App.version + " on port " + App.port + " in " + App.env + " mode")
        }
    }
}


if (App.env != "test") {
    App.app.use(morgan('dev'))
}


// express application module


process.on('exit', (code) => {
    // should notify sysAdmin
    App.logger.trace(new Error(`Fatal Error, About to Exit Node Process with code ${code}`));
});

process.on('unhandledRejection', function(reason, p) {
    App.logger.trace("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

process.on('rejectionHandled', function(reason, p) {
    App.logger.trace("rejectionHandled Rejection at: Promise ", p, " reason: ", reason);
});
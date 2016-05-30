var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'cloud'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://test:test@ds011241.mlab.com:11241/cloud-server'
  },

  test: {
    root: rootPath,
    app: {
      name: 'cloud'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/cloud-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'cloud'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://user:user@ds013172.mlab.com:13172/auth-prod'
  },

};




module.exports = config[env];



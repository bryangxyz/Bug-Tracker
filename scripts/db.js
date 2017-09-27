const mongoose = require('mongoose');

mongoURI = 'mongodb://bryan:bryan@ds149724.mlab.com:49724/bugdb';
mongoose.connect(mongoURI, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongodb connection error' + err);
});
db.on('connected', function() {
  console.log('Mongodb connection open');
});

module.exports = db;

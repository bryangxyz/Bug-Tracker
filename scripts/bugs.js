const mongoose = require('mongoose');

var BugSchema = new mongoose.Schema({
  priority: {
    type: String
  },
  status: {
    type: String
  },
  owner: {
  	type: String
  },
  title: {
    type: String
  }
});

module.exports = mongoose.model('Bug', BugSchema);

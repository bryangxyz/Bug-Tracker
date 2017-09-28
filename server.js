const express = require('express');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const Bug = require('./scripts/bugs.js');
const db = require('./scripts/db.js');
const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(bodyParser.json());

// Get a list of records
app.get('/api/bugs', function(req, res) {
  Bug.find({})
    .then(function(bugs){
      res.send(bugs || []);
    })
});

// Get a single record
app.get('/api/bugs/:id', function(req, res) {
  Bug.findOne({_id: req.params.id})
    .then(function(bug){
      res.send(bug || []);
    })
});

// Modify one record given its ID
app.put('/api/bugs/:id', function(req, res) {
  var bug = req.body;
  Bug.findByIdAndUpdate(req.params.id, {$set: bug}, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Insert a record
app.post('/api/bugs', function(req, res) {
  var priority = req.body.priority;
  var status = req.body.status;
  var owner = req.body.owner;
  var title = req.body.title;

  Bug.create({
    priority: priority,
    status: status,
    owner: owner,
    title: title
  })
  .then((data) => {
    res.status(201).json(data);
  })
});

// Get a list of filtered records
app.post('/api/filter', function(req, res) {
  var filter = {};
  if (req.body.priority) {
    filter.priority = req.body.priority;
  }
  if (req.body.status) {
    filter.status = req.body.status;
  }
  Bug.find(filter)
    .then(function(bugs){
      res.send(bugs || []);
    })
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

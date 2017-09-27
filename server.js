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

var bugData = [
  {id: 1, priority: 'P1', status:'Open', owner:'Ravan', title:'App crashes on open'},
  {id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'}
];

app.get('/api/bugs', function(req, res) {
  Bug.find({})
    .then(function(bugs){
      console.log('get bugs', bugs);
      res.send(bugs || []);
    })
});

app.use(bodyParser.json());
app.post('/api/bugs', function(req, res) {
  console.log("Req body:", req.body);
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

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

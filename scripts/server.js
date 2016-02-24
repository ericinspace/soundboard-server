var express = require('express');
var connectLR = require('connect-livereload');
var bodyParser = require('body-parser');
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');

var app = express();

app.listen( 4000, function() {
  console.log('started listening on 4000');
});

// ******* STATIC SERVER *******
app.use( connectLR( { port: 35729 } ) );
app.use( express.static(__dirname + '/../'));

// ******* API ROUTES *******
// 
// Create our router
var router = express.Router();
router.post('/combine', function(req, res) {
  console.log('received a request to combine');
  var regex = /^data:.+\/(.+);base64,(.*)$/;
  var matches = req.body.match(regex);
  var ext = matches[1];
  var data = matches[2];
  var buffer = new Buffer(data, 'base64');
  console.log(data);
});

router.get('/testroute', function(req, res) {
  console.log('request received!');
})

app.use(bodyParser.text({ limit : '50mb' }));
app.use('/', router);

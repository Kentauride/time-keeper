var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');

var options = {
  key: fs.readFileSync('.cert/key.pem'),
  cert: fs.readFileSync('.cert/cert.pem')
};


var app = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var request = require('request');

var options = {
  key: fs.readFileSync('.cert/key.pem'),
  cert: fs.readFileSync('.cert/cert.pem')
};


var app = express();
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/sfrest', function(req, res) {
    var resource = req.query.resource;
    var accessToken = req.get('Access-Token');

    var errors = [];
    if(!resource) errors.push('Resource not specified');
    if(!accessToken) errors.push('Access-Token header not present');

    if(errors.length > 0) {
        res.send({
            errors: errors
        });
    } else {
        request({
            url: resource,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                res.send(body);
            } else {
                console.log('Error: ' + error);
                res.send(error);
            }
        });
    }
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

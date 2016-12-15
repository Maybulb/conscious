var express = require('express')
	, morgan = require('morgan')
	, request = require('request')
	, util = require('util');

var urls = require('./app/urls');

var app = express();

app.use(morgan('dev'));

app.get('/', function(req, res) {
	if (!req.query) return res.send({error: 'no params specified'});
	if (!req.query.lastfm) return res.send({error: 'lastfm not specified'});
	if (!req.query.tumblr) return res.send({error: 'tumblr not specified'});
	if (!req.query.github) return res.send({error: 'github not specified'});

	var endpoints = [];

	for (user in urls) {
		var endpoint = util.format(urls[user], req.query[user])
		endpoints.push(endpoint);
	}

	res.send(endpoints);
});

app.listen(8080, function() {
	console.log('you on 8080 homie u good');
});
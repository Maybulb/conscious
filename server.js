// Organize this piece of shit later
var http    = require('http'),
    express = require('express'),
    app     = express(),

var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  // lastfm's URL is absolutely ridiculous why isn't JSON default wtf
  "lastfm" = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
            "&user="+ user + "&api_key=" + LASTFM_KEY + "&format=json",
  "telegram" = "",
  "github"   = "",
  "echo"     = ""
}

// asssssynchronous  mMMMMMM good shit
function getPage(url, callback) {
  var request = http.get(url, function(response) {
    var body = ''

    response.on('data', function(chunk) {
      body += chunk
    })

    response.on('end', function() { callback(body) })
  })
}

router.get('/', function(request, response) {
 // do work after a bike ride
})

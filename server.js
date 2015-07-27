// Organize this piece of shit later
var http    = require('http'),
    express = require('express'),
    app     = express();

var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  // lastfm's URL is absolutely ridiculous why isn't JSON default wtf
  // "telegram"   : "",
  "lastfm" : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
            "&user=ltrlly&api_key=" +  process.env.LASTFM_KEY + "&format=json",
  "github"   : "http://api.github.com/users/lwwws",
  // "echo"     : ""
}

// asssssynchronous  mMMMMMM good shit
function getPage(url, callback) {
  var request = http.get(url, function(response) {
    var body = ''

    response.on('data', function(chunk) { body += chunk })
    response.on('end', function() { callback(body) })
  })
}

var json = {
  "sleeping":false,
  "last_online":{}
}

router.get('/', function(req, res) {
  for (var url in urls) {
    json.last_online[url] = urls[url];
  }
  res.json(json)
})

app.use('/', router)
app.listen(port)

// Organize this piece of shit later
var http    = require('http'),
    express = require('express'),
    app     = express();

var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  // lastfm's URL is absolutely ridiculous why isn't JSON default wtf
  "lastfm"   : "",
  "telegram" : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
            "&user=ltrlly&api_key=" + LASTFM_KEY + "&format=json"
  "github"   : "https://api.github.com/users/lwwws",
  "echo"     : ""
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

router.get('/', function(req, res) {
  json = {
    "awake": false,
    "last_online": {
      "telegram": false,
      "github"  : false,
      "lastfm"  : false
    }
  }
  res.json(json)
})

app.use('/', router)
app.listen(port)

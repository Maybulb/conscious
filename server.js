// Organize this piece of shit later
var http    = require('http'),
    express = require('express'),
    agent   = require('superagent'),
    Promise = require('promise'),
    app     = express();

var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  // lastfm's URL is absolutely ridiculous why isn't JSON default wtf
  // "telegram"   : "",
  "lastfm" : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
            "&user=ltrlly&api_key=" +  process.env.LASTFM_KEY + "&format=json",
  "github"   : "https://api.github.com/users/lwwws",
  // "echo"     : ""
}

// asssssynchronous  mMMMMMM good shit
function getPage(url) {
  return new Promise(function(resolve, reject) {
    agent.get(url).end(function(err, res) {
      if (err) return reject(err)
      resolve(res.body)
    });
  })
}

var json = {
  "sleeping":false,
  "last_online":{}
}

router.get('/', function(req, res) {
  Promise.all(
    Object.keys(urls).map(function(key) {
      return getPage(urls[key]).then(function(data) {
        json.last_online[key] = data;
      })
    })
  ).then(function() {
    res.json(json)
  })
})

app.use('/', router)
app.listen(port)

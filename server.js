// Organize this piece of shit later
var http    = require('http'),
    express = require('express'),
    agent   = require('superagent'),
    Promise = require('promise'),
    app     = express();

var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  // "telegram"   : "",
  // "instagram"  : "",
  "lastfm"   : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
            "&user=ltrlly&api_key=" + process.env.LASTFM_KEY + "&format=json",
  "github"   : "https://api.github.com/users/lwwws",
  "echo"     : "http://developer.echonest.com/api/v4/song/search?api_key=" +
                process.env.ECHONEST_KEY + "&title=" + "Fallen Leaves" +
                "&artist=" + "Billy Talent" + "&results=1&sort=duration-desc" +
                "&bucket=audio_summary"
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
  "responses":{}
}

router.get('/', function(req, res) {
  Promise.all(
    Object.keys(urls).map(function(key) {
      return getPage(urls[key]).then(function(data) {
        switch(key) {
          case 'lastfm':
            json.last_online[key] = data.recenttracks.track[0]
            break;
          case 'github':
            json.last_online[key] = data.updated_at
            break;
          case 'echo':
            json.last_online[key] = data
        }
      })
    })
  ).then(function() {
    res.json(json)
  })
})

app.use('/', router)
app.listen(port)

console.log('running on port 8080')

var http    = require('http'),
    express = require('express'),
    agent   = require('superagent'),
    Promise = require('promise'),
    moment  = require('moment'),
    util    = require('util'),
    app     = express();


var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  "tumblr"       : "http://api.tumblr.com/v2/blog/%s/info?api_key=" + process.env.TUMBLR_KEY,
  "lastfm"       : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=%s&api_key=" + process.env.LASTFM_KEY + "&format=json",
  "github"       : "https://api.github.com/users/%s"
}

// asssssynchronous  mMMMMMM good shit
function get(url) {
  return new Promise(function(resolve, reject) {
    agent.get(url).end(function(err, res) {
      if (err) return reject(err)
      resolve(res.body)
    });
  })
}

router.get('/', function(req, res) {
  var json = {
    "responses":{}
  }

  Promise.all(
    Object.keys(urls).map(function(key) {
      var url = util.format(urls[key], req.query[key])
      return get(url).then(function(data) {
        switch(key) {
          case 'lastfm':
            var lastfm = data.recenttracks.track[0]
            json.responses.lastfm = {
              title: lastfm.name,
              artist: lastfm.artist['#text'],
              relative: moment.unix(lastfm.date['uts']).fromNow(),
              exact: moment.unix(lastfm.date['uts']),
              energy: json.responses.song_energy
            }

            break;
          case 'github':
            json.responses[key] = {
                "relative": moment.utc(data.updated_at).fromNow(),
                "exact": data.updated_at
              }
            break;
          case 'tumblr':
            json.responses[key] = {
              "relative": moment.unix(data.response.blog.updated).fromNow(),
              "exact": moment.unix(data.response.blog.updated)
            }
        }
      })
    })
  ).then(function() {
    var encodedArtist = encodeURI(json.responses.lastfm.artist['#text'])
    var encodedSong   = encodeURI(json.responses.lastfm.name)
    var url = "http://developer.echonest.com/api/v4/song/search?api_key=" +
                  process.env.ECHONEST_KEY + "&title=" + encodedSong +
                  "&artist=" + encodedArtist + "&results=1&sort=duration-desc" +
                  "&bucket=audio_summary"
    return get(url).then(function(data) {
      json.responses.lastfm.energy = data.response.songs[0].audio_summary.energy
    })
  }).then(function() {
    // delete json.responses.lastfm['title'] // This is too much
    // delete json.responses.lastfm['artist'] // Why
    res.json(json)
  }).catch(function(err) {
    console.error(err);
    res.status(500).send('are you having a crap of me mate??  Are you, having a crap of me mate') // @dril is my dad
  })
})

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.use('/', router)
app.listen(port)


// This is the worst js file in the world.......

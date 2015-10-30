// Organize this piece of shit later
var http    = require('http'),
    express = require('express'),
    agent   = require('superagent'),
    Promise = require('promise'),
    moment  = require('moment'),
    app     = express();


var port = process.env.PORT || 8080
var router = express.Router();

var urls = {
  // "instagram"    : "https://api.instagram.com/v1/users/" + 'adamlewes' +
  //                   "/media/recent/?access_token=" + process.env.INSTAGRAM_KEY,
  "tumblr"       : "http://api.tumblr.com/v2/blog/lwwws.tumblr.com/info?api_key=" +
                    process.env.TUMBLR_KEY,
  "lastfm"       : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
                    "&user=ltrlly&api_key=" + process.env.LASTFM_KEY + "&format=json",
  "github"       : "https://api.github.com/users/lw"
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

var json = {
  "sleeping":false,
  "responses":{}
}

router.get('/', function(req, res) {
  Promise.all(
    Object.keys(urls).map(function(key) {
      return get(urls[key]).then(function(data) {
        switch(key) {
          case 'lastfm':
            var lastfm = data.recenttracks.track[0]
            json.responses.lastfm = {
              title: lastfm.name,
              artist: lastfm.artist['#text'],
              time: moment.unix(lastfm.date['uts']).fromNow(),
              energy: json.responses.song_energy
            }

            break;
          case 'github':
            json.responses[key] = data.updated_at
            break;
          case 'tumblr':
            json.responses[key] = moment.unix(data.response.blog.updated).fromNow()
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
    res.json(json)
  }).catch(function(err) {
    res.status(500).send('are you having a crap of me mate?? Are you, having a crap of me mate') // @dril is my dad
  })
})

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.use('/', router)
app.listen(port)

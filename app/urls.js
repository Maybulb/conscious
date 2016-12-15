var keys = require('./keys.json');

module.exports = {
  "tumblr": "http://api.tumblr.com/v2/blog/%s/info?api_key=" + (process.env.TUMBLR_KEY || keys.tumblr),
  "lastfm": "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=%s&api_key=" + (process.env.LASTFM_KEY || keys.last_fm) + "&format=json",
  "github": "https://api.github.com/users/%s"
}
var express = require('express')
  , app = express()
  , util = require('util');

var urls = {
  "tumblr"       : "http://api.tumblr.com/v2/blog/%s/info?api_key=" + process.env.TUMBLR_KEY,
  "lastfm"       : "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=%s&api_key=" + process.env.LASTFM_KEY + "&format=json",
  "github"       : "https://api.github.com/users/%s"
}
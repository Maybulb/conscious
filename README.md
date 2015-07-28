Is Adam Lewes Awake?
=====================

The golden question of today's generation.

Prologue
----------

Adam's decided to make an effort to improve upon his sleep schedule, but only on some days/nights. I need to know when Adam Lewes is awake at any point of the day. This must be done. It will be done.

API
---

I'm looking to build an easy API to use with only a few pieces of information.

```json
{
	"awake": false,
	"last_online": {
		"telegram": {"date":"26 06 15", "time":"24:15 PST"},
		"github"  : {"date":"25 06 15", "time":"23:55 PST"},
		"lastfm"  : {"date":"26 06 15", "time":"07:10 PST", "energy": 1},
		"instagram": {"date":"26 06 15", "time":"14:20 PST"},
		"tumblr": {"date":"26 06 15", "time":"18:09 PST"}
	}
}
```

The "energy" level is as follows:

![Energy Explanation](http://i.imgur.com/YgFwNxp.png)

Resources
---------

I'm gonna need at least 4 APIs to get this working. Here's a list of them:

- [Telegram](https://core.telegram.org/#getting-started)
- [Last.fm](http://www.last.fm/api)
- [GitHub](https://developer.github.com/v3/)
- [Echo Nest API](http://developer.echonest.com/docs/v4)
- [Instagram](https://instagram.com/developer/endpoints/users/)<sup><a href="#fn1" id="f1">1</a></sup>
- [Tumblr](https://www.tumblr.com/docs/en/api/v2)<sup><a href="#fn2" id="f2">2</a></sup>

The Echo Nest API will be for tracking the energy of a song, as glossed over above. This is gonna hook in with Last.fm so we can get a song's information on a deeper level, which will be important.

<sup><a href="#f1">1</a></sup> There isn't an actual endpoint to find the *most* recent activity of the user (like in the "Activity" pane within the Instagram App), so we'll have to hack something together by comparing timestamps of `GET /users/user-id/media/recent` and the timestamps of the users likes (using `GET /users/user-id`).

<sup><a href="#f1">2</a></sup> As with Instagram, Tumblr doesn't seem to combine a user's likes and posts into one feed, but that doesn't really matter anyway since Tumblr's API doesn't give you the date a post was liked. It instead gives you the date said post was *made*, so it wouldn't be helpful in the long run.

LICENSE
-------

Might as well just slap an MIT on here just to be safe. Eh.

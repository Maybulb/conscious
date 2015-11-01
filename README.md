Woke
====

The golden question of today's generation.

Goal
----
Users will be able to sign in through Twitter or Facebook, then connect the service
with their other social networks. Information will then be thrown around until
the final answer is given: Are you (or any other user) awake right now?

Prologue
----------

Adam's decided to make an effort to improve upon his sleep schedule, but only on some days/nights. Communication with him started becoming an issue, and I'd have to determine
a lot of times of guesses and his timezone whether or not he was awake or not. Woke plans to solve this with a simple API, as mentioned below.

Info
----
We ([Bright](https://github.com/madebybright)) are not responsible for how a person/persons may use this service ([Woke](https://github.com/madebybright/woke/)), nor do we promote or condone the use of this software for reasons that violate international law. 

Basically, if you're using this for creepy or weird illegal shit, fuck off.

API
---

I'm looking to build an easy API to use with only a few pieces of information.

```
http://woke.heroku.com/usernames?github=lw&instagram=adamlewes&tumblr=lwwws&twitter=adamlewes&lastfm=ltrlly
```

```json
{
	"awake": 0.88,
	"last_online": {
		"github": {
			"date": "25 06 15",
			"time": "23:55 PST"
		},
		"instagram": {
				"date": "26 06 15",
				"time": "14:20 PST"
			},
		"tumblr": {
				"date": "26 06 15",
				"time":"18:09 PST"
			},
		"twitter": {
			"date": "26 06 15",
			"time":"20:18 PST"
		},
		"lastfm": {
			"date": "26 06 15",
			"time": "07:10 PST", "energy": 0.515896
		}
	}
}
```

The "energy" level is as follows:

![Energy Explanation](http://i.imgur.com/YgFwNxp.png)

Resources
---------

I'm gonna need APIs from a few different services that Adam uses to get this
working. Here's a list of them:

- [GitHub](https://developer.github.com/v3/)
- [Instagram](https://instagram.com/developer/endpoints/users/)<sup><a href="#fn1" id="f1">1</a></sup>
- [Tumblr](https://www.tumblr.com/docs/en/api/v2)<sup><a href="#fn2" id="f2">2</a></sup>
- [Last.fm](http://www.last.fm/api)
- [Twitter](https://dev.twitter.com/)
- [Echo Nest API](http://developer.echonest.com/docs/v4)<sup><a href="#fn3" id="f3">3</a></sup>

<sup><a href="#f1">1</a></sup> There isn't an actual endpoint to find the *most* recent activity of the user (like in the "Activity" pane within the Instagram App), so we'll have to hack something together by comparing timestamps of `GET /users/user-id/media/recent` and the timestamps of the users likes (using `GET /users/user-id`).

<sup><a href="#f1">2</a></sup> As with Instagram, Tumblr doesn't seem to combine a user's likes and posts into one feed, but that doesn't really matter anyway since Tumblr's API doesn't give you the date a post was liked. It instead gives you the date said post was *made*, so it wouldn't be helpful in the long run.

<sup><a href="#f3">3</a></sup> The Echo Nest API will be for tracking the energy of a song, as glossed over above. We'll hook this in with Last.fm so we can get a song's information on a deeper level, which will be important. With this API we can get the energy of a song, which returns a float value from 0-1. The higher the number the more energy the song contains. We can use this to determine (or guess, really) if the user has music playing while they're sleeping or not (soft music or not).

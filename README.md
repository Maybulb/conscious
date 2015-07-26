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
		"lastfm"  : {"date":"26 06 15", "time":"07:10 PST", "energy": 1}
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

The Echo Nest API will be for tracking the energy of a song, as glossed over above. This is gonna hook in with Last.fm so we can get a song's information on a deeper level, which will be important.

LICENSE
-------

Might as well just slap an MIT on here just to be safe. Eh.

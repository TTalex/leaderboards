# Leaderboards

Completely unsafe and open API to keep tracks of scores of players trying my web games.

Any player can use any name, so conflicts should be expected. But eh, who cares, I'm sure the 10 people that will end up using this can figure it out and use unique names.

## SDK

Players names are saved in cookies via a simple SDK.

SDK functions can be imported in a module:

```
<script type="module">
    import {storeScore} from 'http://localhost:3000/sdk.js'
    storeScore("testGame", "gameCategory", 1).then((err) => console.log(err))
</script>
```

They are also exposed gobally under the `LeaderboardsSdk` name

```
<script src="http://localhost:3000/sdk.js" type="module"></script>
<script>
    console.log(LeaderboardsSdk.getId())
    LeaderboardsSdk.storeScore(("testGame", "gameCategory", 1)
</script>
```

## Frontend
The repo also includes a frontend: `changename.html` with a simple form for players to edit and save their name.

Link to this page is added to games, for example, here's a link in React with a dynamic style
```
    <a href="http://localhost:3000" target='_blank' rel="noreferrer" alt="login" style={{color: "transparent", textShadow:  LeaderboardsSdk.getId() ? "0 0 0 hsl(171, 100%, 41%)" : "0 0 0 lightgray"}}>👤</a>
```

It is planned to add a proper frontend to display full leaderboards at some point.
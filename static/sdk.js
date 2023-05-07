const leaderboardsApiUrl = "http://localhost:3000/api/"
const cookieName = "_bourreau_dev_id"

export function getId() {
    let found = false;
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        if (k.trim() == cookieName) {
            found = v
        }
    })
    return found
}

export function setId(value) {
    if (value === false) {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax;"
    } else {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        document.cookie = cookieName + "=" + value + "; expires=" + d.toUTCString() + "; SameSite=Lax;"
    }
}

export async function storeScore(gameId, categoryId, score) {
    let playerId = getId()
    if (!playerId) {
        console.log("couldn't find player Id")
        return true
    }
    const response = await fetch(leaderboardsApiUrl + "storeScore", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            playerId: playerId,
            gameId: gameId,
            categoryId: categoryId,
            score: score
        })
    })
    const content = await response.json();
    return content.err;
}

window.LeaderboardsSdk = {getId, setId, storeScore}
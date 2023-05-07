const sqlite3 = require('sqlite3')
const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const privateKeyFile = ""
const certFile = ""
const port = 3000

const db = new sqlite3.Database('scores.db');
db.run("CREATE TABLE Scores (gameId TEXT, categoryId TEXT, playerId TEXT, score INT, date TEXT)", (err) => {})

function saveScore(gameId, categoryId, playerId, score) {
    return new Promise(resolve => {
        db.run("INSERT INTO Scores VALUES (?, ?, ?, ?, ?)", [gameId, categoryId, playerId, score, new Date().toISOString()], err => {
            if (err) {
                console.log("Insert error", err)
            }
            resolve(err);
        });
    });
}
function loadAllScores() {
    return new Promise(resolve => {
        db.all("SELECT * from Scores", (err, data) => {
            resolve(data);
        })
    });
}

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('static'));

app.post('/api/storeScore', async (req, res) => {
    if (!req.body.gameId || !req.body.playerId || !req.body.categoryId || !req.body.score) {
        return res.json({
            err: "Missing at least one body parameter"
        })
    }
    let err = await saveScore(req.body.gameId, req.body.categoryId, req.body.playerId, req.body.score);
    res.json({
        err: err
    });
})

app.get('/api/loadAllScores', async (req, res) => {
    const scores = await loadAllScores();
    res.json({
        scores: scores
    });
})

if (privateKeyFile) {
    const privateKey = fs.readFileSync(privateKeyFile)
    const certificate = fs.readFileSync(certFile)
    const credentials = {key: privateKey, cert: certificate};
    const server = https.createServer(credentials, app);
    server.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
} else {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`)
    })
}


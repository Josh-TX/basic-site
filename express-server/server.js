const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

var basepath = process.argv.length >= 3 ? process.argv[2] : "/data";
try {
    if (!fs.existsSync(basepath)) {
        console.error(`Directory ${basepath} does not exist. Exiting.`);
        console.log(`If running as a container, make sure that you've included a volume mounted to /data`);
        process.exit(1);
    }
    // Check if the directory is writable
    fs.accessSync(basepath, fs.constants.W_OK);
} catch (err) {
    console.error(`Directory ${basepath} is not writable or accessible. Exiting.`);
    process.exit(1);
}
console.log(`Directory ${basepath} exists and is writable`)

const AUTHKEY = process.env.AUTHKEY;

app.use(express.static('public'));
app.use(express.text());

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (AUTHKEY && authHeader !== AUTHKEY) {
        return res.sendStatus(401);
    }
    next();
};

app.post('/save', checkToken, (req, res) => {
    const filename = req.query.filename;
    if (!filename) {
        return res.sendStatus(400);
    }
    const data = req.body || '';
    var filepath = path.join(basepath, filename)
    fs.writeFileSync(filepath, data);
    res.sendStatus(200);
});

app.get('/load', (req, res) => {
    const filename = req.query.filename;
    if (!filename) {
        return res.sendStatus(400);
    }
    let data = "";
    try {
        var filepath = path.join(basepath, filename)
        data = fs.readFileSync(filepath, 'utf8');
    } catch (err) {
        data = ""
    }
    res.send(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
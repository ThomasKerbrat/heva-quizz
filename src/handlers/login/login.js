
// ===== Requires ===== //

const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const config = require('../../config.js');
const router = express.Router();



// ===== Requires ===== //

router.get('/', loginGET);
router.post('/', loginPOST);



// ===== Exports ===== //

module.exports = router;



// ===== Handler ===== //

function loginGET(req, res) {
    const page = fs.readFileSync('./src/handlers/login/login.html', 'utf-8');
    const template = handlebars.compile(page);

    const context = {
        email: null,
    };

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template(context));
    res.end();
}

function loginPOST(req, res) {
    const users = JSON.parse(fs.readFileSync(path.join(config.storagePath, 'users/users.json'), 'utf-8'));
    const email = req.body.email;
    const password = crypto.createHash('sha256').update(req.body.password + config.salt).digest('hex');

    let foundUser = false;
    for (let user of users) {
        if (user.email === email && user.password === password) {
            user.token = crypto.createHash('sha256').update(Math.random().toString()).digest('hex');
            user.tokenExpiry = Date.now() + 3.6e6;

            res.cookie('auth', user.token, { expires: new Date(user.tokenExpiry + 3.6e6), httpOnly: true });

            fs.writeFileSync(path.join(config.storagePath, 'users/users.json'), JSON.stringify(users), 'utf-8');
            foundUser = true;
            break;
        }
    }

    if (foundUser) {
        res.redirect(302, '/');
    }
}

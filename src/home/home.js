
// ===== Requires ===== //

const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');

const { authenticate } = require('../authentication.js');
const router = express.Router();



// ===== Requires ===== //

router.use(authenticate);
router.get('/', homeGET);
router.get('/logout', logoutGET);



// ===== Exports ===== //

module.exports = router;



// ===== Handler ===== //

function homeGET(req, res) {
    const page = fs.readFileSync('./src/home/home.html', 'utf-8');
    const template = handlebars.compile(page);

    const quizzes = JSON.parse(fs.readFileSync('data/quizzes.json'));

    const context = {
        fullname: req.user.firstname + ' ' + req.user.lastname,
        quizzes: quizzes,
    };

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template(context));
    res.end();
}

function logoutGET(req, res) {
    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));

    for (let user of users) {
        if (user.id === req.user.id) {
            user.token = null;
            user.tokenExpiry = null;
            fs.writeFileSync('data/users.json', JSON.stringify(users));
            break;
        }
    }

    res.redirect(302, '/');
}

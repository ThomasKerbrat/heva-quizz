
// ===== Requires ===== //

const express = require('express');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const { authenticate } = require('../../authentication.js');
const config = require('../../config.js');
const router = express.Router();



// ===== Config ===== //

router.use(authenticate);
router.get('/:code', quizzGET);



// ===== Exports ===== //

module.exports = router;



// ===== Handler ===== //

function quizzGET(req, res) {
    const page = fs.readFileSync('./src/handlers/quizz/quizz.html', 'utf-8');
    const template = handlebars.compile(page);

    const quizzes = JSON.parse(fs.readFileSync(path.join(config.storagePath, 'quizzes/quizzes.json')));
    const questions = JSON.parse(fs.readFileSync(path.join(config.storagePath, 'quizzes', req.params.code, 'questions.json')));

    let quizz = null;
    for (let _quizz of quizzes) {
        if (_quizz.code === req.params.code) {
            quizz = _quizz;
            break;
        }
    }

    if (quizz === null) {
        res.sendStatus(500);
        console.error('No quizz object found in quizzes/quizzes.json for code: ' + req.params.code);
        return;
    }

    const context = {
        fullname: req.user.firstname + ' ' + req.user.lastname,
        quizz: quizz,
        questions: questions,
    };

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(template(context));
    res.end();
}

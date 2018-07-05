
// ===== Requires ===== //

const express = require('express');
const router = express.Router();



// ===== Config ===== //

router.use('/login', require('./handlers/login/login.js'));
router.use('/quizz', require('./handlers/quizz/quizz.js'));
router.use('/', require('./handlers/home/home.js'));



// ===== Exports ===== //

module.exports.routes = router;

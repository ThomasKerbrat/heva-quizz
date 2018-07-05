
// ===== Requires ===== //

const express = require('express');
const router = express.Router();



// ===== Config ===== //

// router.use('/quizz', require('./quizz/quizz.js'));
// router.use('/result', require('./result/result.js'));
router.use('/login', require('./handlers/login/login.js'));
router.use('/', require('./handlers/home/home.js'));



// ===== Exports ===== //

module.exports.routes = router;

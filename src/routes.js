
// ===== Requires ===== //

const express = require('express');
const router = express.Router();



// ===== Config ===== //

// router.use('/quizz', require('./quizz/quizz.js'));
// router.use('/result', require('./result/result.js'));
router.use('/login', require('./login/login.js'));
router.use('/', require('./home/home.js'));



// ===== Exports ===== //

module.exports.routes = router;


// ===== Requires ===== //

const express = require('express');
const routes = express.Router();



// ===== Config ===== //

// router.use('/home', require('./home/home.js'));
// router.use('/quizz', require('./quizz/quizz.js'));
// router.use('/result', require('./result/result.js'));
routes.use('/', require('./login/login.js'));



// ===== Exports ===== //

module.exports.routes = routes;

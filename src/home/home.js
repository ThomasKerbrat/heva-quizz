
// ===== Requires ===== //

const express = require('express');
const fs = require('fs');

const { authenticate } = require('../authentication.js');
const router = express.Router();



// ===== Requires ===== //

router.use(authenticate);
router.get('/', homeGET);



// ===== Exports ===== //

module.exports = router;



// ===== Handler ===== //

function homeGET(req, res) {
    const page = fs.readFileSync('./src/home/home.html', 'utf-8');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
}

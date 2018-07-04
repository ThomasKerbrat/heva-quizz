
// ===== Requires ===== //

const fs = require('fs');



// ===== Exports ===== //

module.exports = login;



// ===== Handler ===== //

function login(req, res) {
    const page = fs.readFileSync('./src/login/login.html');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
}

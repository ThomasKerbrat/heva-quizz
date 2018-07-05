
// ===== Exports ===== //

const fs = require('fs');
const path = require('path');

const config = require('./config.js');



// ===== Config ===== //

const Auth = Object.freeze({
    isAuthenticated: isAuthenticated,
});



// ===== Exports ===== //

module.exports.authenticate = authenticate;
module.exports.Auth = Auth;



// ===== Module ===== //

function authenticate(req, res, next) {
    const isAuthCookie = 'auth' in req.cookies;

    if (!isAuthCookie) {
        res.redirect(302, '/login');
        return;
    }

    const token = req.cookies.auth;
    const users = JSON.parse(fs.readFileSync(path.join(config.storagePath, 'users/users.json'), 'utf-8'));

    for (let user of users) {
        if (user.token === token && Date.now() < user.tokenExpiry) {
            req.user = {
                id: user.id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
            }
            break;
        }
    }

    if (req.user == null) {
        res.redirect(302, '/login');
        return;
    }

    next();
}

function isAuthenticated(req) {
    return req.user !== null;
}

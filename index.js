
// ===== Requires ===== //

const express = require('express');
const app = express();
const routes = require('./src/routes.js').routes;



// ===== Config ===== //

app.use(routes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

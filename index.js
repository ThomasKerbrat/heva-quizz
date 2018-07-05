
// ===== Requires ===== //

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const { routes } = require('./src/routes.js');
const { consolidate } = require('./src/storage/consolidate.js');



// ===== Config ===== //

consolidate();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('src/assets'));
app.use(routes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

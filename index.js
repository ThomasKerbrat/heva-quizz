
// ===== Requires ===== //

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const handlebars = require('handlebars');

const { routes } = require('./src/routes.js');
const { consolidate } = require('./src/storage/consolidate.js');

const app = express();



// ===== Config ===== //

consolidate();

handlebars.registerHelper('increment', function (value) {
    return parseInt(value) + 1;
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('src/assets'));
app.use(routes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

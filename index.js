const express    = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const auth     = require('./auth/auth.controller');
const products = require('./products/products.controller');

app.use(auth);
app.use(products);

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
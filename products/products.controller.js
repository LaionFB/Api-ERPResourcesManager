const express    = require('express');
const route      = express.Router();
const jwt        = require('../utils/jwt');

route.use(jwt.authMiddleware);

let products = require('./products.repository');

route.get('/search', function (req, res) {
    let result = products.filter(x => (!req.query.name.toUpperCase || x.name.toUpperCase().includes(req.query.name.toUpperCase())) &&
                                      (!req.query.cod || x.cod.toUpperCase() == req.query.cod.toUpperCase()) &&
                                      (!req.query.position || x.position.toUpperCase().includes(req.query.position.toUpperCase()))
    );
    res.send(result);
});

route.get('/getById', function (req, res) {
    let result = products.find(x => x.id == req.query.id);
    res.send(result);
});

route.get('/getByCode', function (req, res) {
    let result = products.find(x => x.cod == req.query.code);
    res.send(result);
});

route.post('/save', function (req, res) {
    let item = products.find(x => x.id = req.body.id);
    item.qtd = req.body.qtd;
    item.position = req.body.position;
    res.send(true);
});

module.exports = route;
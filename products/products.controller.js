const express    = require('express');
const route      = express.Router();
const jwt        = require('../utils/jwt');

route.use(jwt.authMiddleware);

let products = require('./products.repository');

route.get('/search', function (req, res) {
    let result = products.filter(x => (!req.query.name || x.name.includes(req.query.name)) &&
                                      (!req.query.id || x.id == req.query.id) &&
                                      (!req.query.desc || x.desc.includes(req.query.desc)) &&
                                      (!req.query.position || x.position.includes(req.query.position))
    );
    res.send(result);
});

route.get('/getById', function (req, res) {
    let result = products.find(x => x.id == req.query.id);
    res.send(result);
});

route.post('/save', function (req, res) {
    let item = products.find(x => x.id = req.body.id);
    item.qtd = req.body.qtd;
    item.position = req.body.position;
    res.send(true);
});

module.exports = route;
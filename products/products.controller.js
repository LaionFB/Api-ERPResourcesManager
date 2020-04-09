const express    = require('express');
const route      = express.Router();
const jwt        = require('../utils/jwt');

route.use(jwt.authMiddleware);

var products = [
    { id: 1, name: 'Parafuso M90', desc: 'parafuso tamanho M90', position: '01230204', cod: 'aaaaaa', qtd: 10 },
    { id: 2, name: 'Parafuso M95', desc: 'parafuso tamanho M95', position: '01230205', cod: 'bbbbbb', qtd: 10 },
    { id: 3, name: 'Parafuso M100', desc: 'parafuso tamanho M100', position: '01230206', cod: 'cccccc', qtd: 10 },
]

route.get('/search', function (req, res) {
    var result = products.filter(x => (!req.query.name || x.name.includes(req.query.name)) &&
                                      (!req.query.id || x.id == req.query.id) &&
                                      (!req.query.desc || x.desc.includes(req.query.desc)) &&
                                      (!req.query.position || x.position.includes(req.query.position))
    );
    res.send(result);
});

route.get('/getById', function (req, res) {
    var result = products.find(x => x.id == req.query.id);
    res.send(result);
});

route.post('/save', function (req, res) {
    var item = products.find(x => x.id = req.body.id);
    item.qtd = req.body.qtd;
    item.position = req.body.position;
    res.send(true);
});

module.exports = route;
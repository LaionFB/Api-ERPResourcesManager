var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var jsonParser = bodyParser.json()

var products = [
    { id: 1, name: 'Parafuso M90', desc: 'parafuso tamanho M90', position: '01230204', cod: 'aaaaaa', qtd: 10 },
    { id: 2, name: 'Parafuso M95', desc: 'parafuso tamanho M95', position: '01230205', cod: 'bbbbbb', qtd: 10 },
    { id: 3, name: 'Parafuso M100', desc: 'parafuso tamanho M100', position: '01230206', cod: 'cccccc', qtd: 10 },
]

app.get('/search', function (req, res) {
    var result = products.filter(x => (!req.query.name || x.name.includes(req.query.name)) &&
                                      (!req.query.id || x.id == req.query.id) &&
                                      (!req.query.desc || x.desc.includes(req.query.desc)) &&
                                      (!req.query.position || x.position.includes(req.query.position))
    );
    res.send(result);
});

app.get('/getById', function (req, res) {
    var result = products.find(x => x.id == req.query.id);
    res.send(result);
});

app.post('/save', jsonParser, function (req, res) {
    var item = products.find(x => x.id = req.body.id);
    item.qtd = req.body.qtd;
    item.position = req.body.position;
    res.send(true);
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
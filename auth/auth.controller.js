const express = require('express');
const route   = express.Router();
const jwt     = require('../utils/jwt');

var users = [{ id: 1, username: 'admin', password: 'admin' }]

route.post('/login', (req, res) => {
    if(!req.body)
        return res.status(400).send('Informe o usuários e a senha!');

    let user = users.find(x => x.username == req.body.username);
    if(!user || user.password != req.body.password)
        return res.status(400).send('Usuário ou senha errados!');
    
    let token = jwt.genToken(user.id, user.username);
    res.send(token);
});

module.exports = route;
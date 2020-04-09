const jsonwebtoken = require('jsonwebtoken');
const config       = require('../config.json');
const TOKEN_LIMIT  = 86400000; //one day

module.exports.genToken = (id, username) => {
    return jsonwebtoken.sign({ id: id, nm: username, dt: new Date().getTime() }, config.jwt_private_key);
}

module.exports.authMiddleware = (req, res, next) => {
    let token = req.header('Authorization') || '';
    token = token.replace('Bearer ', '');
    
    try {
        let decoded = jsonwebtoken.verify(token, config.jwt_private_key);
        req.user = decoded;
        if(decoded.dt + TOKEN_LIMIT < new Date().getTime())
            return res.status(401).send('Acesso negado!');
        next();
    } catch(err) {
        res.status(401).send('Acesso negado!');
    }
}
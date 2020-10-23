// const {response} = require('express');
const express = require('express');
const router = express.Router();
const config = require('../config'); //config
const jwt = require('jsonwebtoken'); //jwt
var db = require('../db');

/**
 * Receive email and password
 * Find user
 * Generate token
 */
router.post('/login', (req, res, next) => {
    const { email, password } = req.body.userData;

    if (email === undefined || password === undefined ) {
        res.status(401).json({
            success: false,
            code: 'JCS_API_ERROR_01',
            message: "E-mail and/or password invalid"
        })
    } else {
        //Find user in MongoDB
        //Payload
        let tokenData = {
            id: 101
        }
        let generatedToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '1m'});
        res.json({
            success: true,
            token: generatedToken
        })
    }
});

/* GET user login. */
router.get('/signIn', (req, res, next)  => {
    const { email, password, userToken } = req.body.userData;

    //Payload
    const data = {
        email,
        password,
        userToken
    }

    let generatedToken = jwt.sign(data, config.JWT_KEY, { expiresIn: '1m'});
    
    res.json({
        success: true,
        token: generatedToken
    })

    const handler = (err, result) => {
        // res.send('Erro: '+err)
        if (result) {
            res.json({
                success: true,
                message: 'Usuário autenticado.',
                data: result
            });
        } else {
            res.json({
                success: false,
                message: 'Falha na autenticação do usuário.',
                error: err
            });
        }
    }
    db.signIn(data, handler);
    // res.json(data);
});

module.exports = router;
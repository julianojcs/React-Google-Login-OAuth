// const {response} = require('express');
const express = require('express');
const router = express.Router();
const config = require('../config'); //config
const jwt = require('jsonwebtoken'); //jwt
var db = require('../db');
var bcrypt = require('bcrypt');

/**
 * Receive email and password
 * Find user
 * Generate token
 */
router.post('/signin', (req, res, next) => {
    const { email, password } = req.body.userData;
    // console.log(req.body);
    if (email === undefined || password === undefined ) {
        res.status(401).json({
            success: false,
            code: 'JCS_API_ERROR_01',
            message: "E-mail and/or password invalid"
        })
    } else {
        //Payload
        const handler = (err, result) => {
            console.log('result: ');
            console.log(result);
            if(!err && result !== null && bcrypt.compareSync(password, result.password)) {
                let tokenData = {
                    name: result.name,
                    email: result.email
                }
                let generatedToken = jwt.sign(tokenData, config.JWT_KEY, { expiresIn: '1m'});
                res.json({
                    name: result.name,
                    email: result.email,
                    success: true,
                    token: generatedToken
                });
            } else {
                res.status(401).json({
                    success: false,
                    code: 'JCS_API_ERROR_02',
                    message: err || 'Usuário/e-mail inválido!'
                });
            }
        }

        //Find user in MongoDB
        db.findUser({email}, handler);
        
    }
});

/* GET user login. */
// router.post('/signIn', (req, res, next)  => {
//     const { email, password, userToken } = req.body.userData;

//     //Payload
//     const data = {
//         email,
//         password,
//         userToken
//     }

//     let generatedToken = jwt.sign(data, config.JWT_KEY, { expiresIn: '1m'});
    
//     res.json({
//         success: true,
//         token: generatedToken
//     })

//     const handler = (err, result) => {
//         // res.send('Erro: '+err)
//         if (result) {
//             res.json({
//                 success: true,
//                 message: 'Usuário autenticado.',
//                 data: result
//             });
//         } else {
//             res.json({
//                 success: false,
//                 message: 'Falha na autenticação do usuário.',
//                 error: err
//             });
//         }
//     }
//     db.signIn(data, handler);
//     // res.json(data);
// });

router.get('/verifytoken', (req, res, next) => {
    //[0] = Bearer ----  [1] = token
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, config.JWT_KEY, (err, decode) => {
        if(!err){
            res.json({
                success: true,
                message: 'Token is valid.'
            });
        } else {
            res.status(401).json({
                success: false,
                error: err
            });
        }
    })
})

module.exports = router;
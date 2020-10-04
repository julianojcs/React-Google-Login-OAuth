const {response} = require('express');
const express = require('express');
const router = express.Router();
const config = require('../config'); //config
const jwt = require('jsonwebtoken'); //jwt

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
            code: 'DD101_API_ERROR_01',
            message: "E-mail and/or password invalid"
        })
    } else {
        //Find user in MongoDB
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
module.exports = router;
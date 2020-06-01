const jwt = require('jsonwebtoken');

const config = require('../../config');

/**
 * Takes a e code in query params and returns a jwt token.
 *
 * @param {string} eCode
 * @returns {string} token
 */
const token = async ( req, res ) => {
    const { eCode } = req.body;

    if(eCode === config.data.auth.eCode) {
    
        const token = await jwt.sign({eCode}, config.data.auth.secret, { expiresIn: '30 days' });
        return res.status(200).json({token: token});
    
    } else {

        return res.status(400).json({
            err: 'Code is invalid',
        });

    }
}

module.exports = {
    token
}
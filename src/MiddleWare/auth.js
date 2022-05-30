const jwt = require('jsonwebtoken');
const secret = 'secret123';

function auth (req,res,next){
    const token = req.header('x-auth-token');

    // Check For Token
    if(!token) res.status(401).json({msg:'No Token, authorization denied'});
    try{
        const decoded = jwt.verify(token,secret);
        // Add user From Payload
        req.user = decoded;
        next();
    }catch(e){
        res.status(400).json({msg:'Token is not Valid'});
    }
}

module.exports = auth;
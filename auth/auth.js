const jwt = require('jsonwebtoken')
require('dotenv').config();


const verifyToken = (req,res,next)=>{
    let headerkey = process.env.TOKEN_HEADER_KEY
    // const token = req.headers('autho')
    const token = req.headers['authorization']

    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log('darshan',decoded);
        req.user = decoded.user;
        next();

    }catch(err){
        res.status(400).send({status:false,message:'invaild token',err})
    }
}

module.exports = verifyToken
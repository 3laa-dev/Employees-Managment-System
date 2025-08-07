require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports =  (paylod)=>{
   const token =   jwt.sign(paylod, process.env.JWT_SECRET_KEY , {expiresIn :'1m'});
    return token;
}
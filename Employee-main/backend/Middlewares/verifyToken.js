const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const status = require('../utils/status');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // صح

    if (!authHeader) {
        const error = new appError("token is required"  , 401 , status.FAIL)
        return next(error);
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken; // تخزين بيانات المستخدم للي بعده
        
        next();
    } catch (err) {
        const error =new  appError("Invalid or expired token"  , 401 , status.FAIL)
        return next(error);
    }
    
};

module.exports = verifyToken;
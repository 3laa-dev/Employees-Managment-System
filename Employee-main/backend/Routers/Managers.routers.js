const control = require('../Controllers/Manager.controls');
const express = require('express');
const router  = express.Router();
const verifyToken = require('../Middlewares/verifyToken');
const { body } = require('express-validator');

router.post('/addManager'  ,  
    body('name').notEmpty().withMessage('Name is required')  ,
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('this is not email')
     , body("phone").notEmpty().withMessage("phone number is required") ,  verifyToken , control.addManager);
router.post('/login', control.login)
router.get('/getManager/:ID' , verifyToken ,control.getManager);
router.get('/getAllManagers' ,verifyToken , control.getAllManagers);

router.patch('/updateManager/:ID' , verifyToken ,body('name').optional().notEmpty().withMessage('Name is required')  ,
body('email').optional().notEmpty().withMessage('Email is required').isEmail().withMessage('this is not email')
 , body("phone").optional().notEmpty().withMessage("phone number is required") ,verifyToken ,  control.updateManager);
router.delete('/deleteManager/:ID', verifyToken ,control.deleteManager);

module.exports = router;


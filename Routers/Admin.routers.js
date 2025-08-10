const express = require('express');
const router  =express.Router();
const control = require('../Controllers/Admin.controls');
const {body} = require('express-validator');
const verfiyToken = require('../Middlewares/verifyToken')

router.post('/register' ,
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required'), 
    body('password').notEmpty().withMessage('password is required'),
    control.register );

router.post('/login' , control.login);

router.get('/getAllAdmins' ,verfiyToken , control.getAllAdmins )

router.get('/getRequests' ,verfiyToken ,  control.getNonAciveAdmins);

router.get('/activeThis/:ID' , verfiyToken,control.activeThis);

router.delete('/deleteAdmin/:ID' , control.deleteAdmin);

module.exports = router;
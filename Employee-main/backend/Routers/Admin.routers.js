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

router.put('/activeThis/:ID' , verfiyToken,control.activeThis);
router.delete('/deleteAdmin/:ID' ,verfiyToken ,  control.deleteAdmin);
router.delete('/deleteAllReq' , verfiyToken , control.deleteAllReq);
module.exports = router;
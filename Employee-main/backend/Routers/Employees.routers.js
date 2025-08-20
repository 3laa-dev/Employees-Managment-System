const control = require('../Controllers/Emplyee.controle');
const express = require('express');
const {body} = require('express-validator');
const verifyToken = require('../Middlewares/verifyToken');


const router = express.Router();


router.get('/getAllEmployees'  , verifyToken , control.getAllEmployees);

router.post('/addEmployee', verifyToken , body('name').notEmpty().withMessage('Name is required')  ,
body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('this is not email')
 , body("phone").notEmpty().withMessage("phone number is required") , control.addEmployee);

router.get('/getEmployee/:ID' , verifyToken, control.getEmployee);

router.patch('/updateEmployee/:ID', verifyToken ,body('name').optional().notEmpty().withMessage('Name is required')  ,
body('email').optional().notEmpty().withMessage('Email is required').isEmail().withMessage('this is not email')
 , body("phone").optional().notEmpty().withMessage("phone number is required")  , control.updateEmployee);

router.delete('/deleteEmployee/:ID', verifyToken  , control.deleteEmployee);

module.exports = router ;
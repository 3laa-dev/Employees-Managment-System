
const express = require('express');
const control = require('../Controllers/Department.controls');
const verifyToken = require('../Middlewares/verifyToken')


const router = express.Router();

router
    .get('/getAllDepatrments'  , verifyToken ,control.getAllDepatrments )
    .post('/addDepartment' , verifyToken ,control.addDepartment );


router
     .get('/getDepartment/:ID' , verifyToken, control.getDepartment)
     .patch('/updateDepartment/:ID', verifyToken , control.updateDepartment)
     .delete('/deleteDepartment/:ID'  , verifyToken, control.deleteDepartment )
router.get('/getDepartmentName/:ID', control.getDepartmentName);

module.exports   =    router;
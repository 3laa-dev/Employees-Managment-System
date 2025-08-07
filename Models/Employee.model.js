const mongoose = require('mongoose');
const validator = require('validator');
const Department = require('./departmens.models');

const employeeSchema =  new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true ,unique : true , validate:[validator.isEmail , 'field mast be a valid email address']},
    phone:{type:String , required:true , unique:true} , 
    salary:{type:Number , required:true} , 
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department'  , required:true}
});

const Employee = mongoose.model('Employee' , employeeSchema);

module.exports = Employee;
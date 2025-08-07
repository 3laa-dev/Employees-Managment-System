const mongoose = require('mongoose');
const validator = require('validator');
const Department  = require('../Models/departmens.models');

const ManagerSchema =  mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true ,unique : true , validate:[validator.isEmail , 'field mast be a valid email address']},
    phone:{type:String , required:true , unique:true} , 
    salary:{type:Number , required:true} , 
    password:{type:String , required:true} , 
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department'  }  , 
    token:{type:String}
});

const Manager = mongoose.model('Manager' , ManagerSchema);

module.exports = Manager;
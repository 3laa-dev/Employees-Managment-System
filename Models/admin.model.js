const mongoose = require('mongoose');
const validator = require('validator');



const adminScheama = mongoose.Schema({
    name:{type:String , required:true } , 
    email:{type:String , required:true , validate:[validator.isEmail , "this not email" ] , unique:true } , 
    password:{type:String , required:true} ,  
    token:{   type:String } , 
    isActive:{type:Boolean , required :true , default:false} , 
    actName:{type:String }
})


const Admin = mongoose.model('Admin'  , adminScheama);

module.exports = Admin ;
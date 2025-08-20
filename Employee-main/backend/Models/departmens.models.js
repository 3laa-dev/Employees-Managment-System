const mongoose = require('mongoose');

const departmentScheama =mongoose.Schema({  
    name:{type:String , required:true } , 
    numberOfEmployees:{type:Number , required:true } , 
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee'  }
})

const Department = mongoose.model("Department"  , departmentScheama);

module.exports = Department;
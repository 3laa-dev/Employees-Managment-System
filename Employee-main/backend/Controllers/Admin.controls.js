const Admin = require('../Models/admin.model');
const asyncWrapper = require('../Middlewares/asyncWrapper');
const bcrypt = require('bcrypt');
const sendData = require('../utils/sendData');
const status = require('../utils/status');
const appError = require('../utils/appError');
const {validationResult} = require('express-validator');
const generateJWT = require('../utils/generateJWT');
const { isLowercase } = require('validator');




const register =asyncWrapper(async (req , res , next)=>{
    const {name , email , password } = req.body;

    const oldAdmin = await Admin.findOne({ email: email });
    if (oldAdmin) {
        const error = new appError("this admin already exist", 400, status.FAIL)
        return next(error);
    }

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new appError(errors.array().map(e => e.msg), 400, Status.FAIL)
            return next(error);
        }
    const hashedPassword = await bcrypt.hash(password , 10);
    const newAdmin = new Admin({name , email ,password : hashedPassword});

    
    await newAdmin.save();
    sendData(res , status.SUCCESS , {admin : newAdmin});
})


const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    

    if (!email || !password) {
        const error = new appError('user not found', 400, status.FAIL);
        return next(error);
    }

    const admin = await Admin.findOne({ email: email })

    if(!admin.isActive){
       const error = new appError('this admin mail is not active', 400, status.FAIL);
        return next(error); 
    }

    const matchedPassword  = await bcrypt.compare(password, admin.password)
    const token = await generateJWT({ email: admin.email, id: admin._id });
    if (admin && matchedPassword ) {
        res.json({
            status: status.SUCCESS,
            data: {
                token
            }
        })
    } else {
        const error = new appError('email or password in false', 500, status.ERROR);
        next(error);
    }
}
)


const getAllAdmins = asyncWrapper(async (req, res , next) => {
    const query = req.query
    

    const admins = await Admin.find({isActive:true}, { '__v': false });
    res.json({
        status: status.SUCCESS,
        data: {
            admins
        }
    })

})

const getNonAciveAdmins = asyncWrapper(async(req , res , next)=>{
   const query = req.query
    

    const admins = await Admin.find({isActive:false}, { '__v': false });
    res.json({
        status: status.SUCCESS,
        data: {
            admins
        }
    })
 
})

const activeThis = asyncWrapper(async(req,res,next)=>{
    const user = req.user;
    const admin = await Admin.findOne({email:user.email});
    if(!admin  || !admin.isActive)
       next(new appError('You are not active'));

    const newAdmin = await Admin.findById(req.params.ID);
    newAdmin.isActive = true;
    newAdmin.actName = admin.name;
    await newAdmin.save();

    sendData(res  , status.SUCCESS ,newAdmin);


})

const deleteAdmin = asyncWrapper(async (req , res , next)=>{
    const ID = req.params.ID;
    const admin = await Admin.findById(ID);
    if(admin.isActive)
        return next(new appError("this admin is active" , 400 , status.FAIL))

    await Admin.findByIdAndDelete(ID);
    res.json({status:status.SUCCESS , data:null});

})
const deleteAllReq =  asyncWrapper(async (req , res , next)=>{
    await Admin.deleteMany({isActive:false});
    res.json({status:status.SUCCESS , data:null});
})
module.exports={register , login , getAllAdmins  , getNonAciveAdmins , activeThis,deleteAdmin,deleteAllReq}
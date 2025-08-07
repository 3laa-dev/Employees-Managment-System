const Admin = require('../Models/admin.model');
const asyncWrapper = require('../Middlewares/asyncWrapper');
const bcrypt = require('bcrypt');
const sendData = require('../utils/sendData');
const status = require('../utils/status');
const appError = require('../utils/appError');
const {validationResult} = require('express-validator');
const generateJWT = require('../utils/generateJWT');


const register =asyncWrapper(async (req , res , next)=>{
    const {name , email , password } = req.body;

    const oldAdmin = await Admin.findOne({ email: email });
    if (oldAdmin) {
        const error = new appError("this admin already exist", 400, status.FAIL)
        return next(error);
    }

    const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new appError(errors.array().map(e => e.msg), 400, status.FAIL)
            return next(error);
        }
    const hashedPassword = await bcrypt.hash(password , 10);
    const newAdmin = new Admin({name , email ,password : hashedPassword});

    const token =await generateJWT({ email: newAdmin.email, id: newAdmin._id });
    newAdmin.token = token;

    await newAdmin.save();
    sendData(res , status.SUCCESS , {admin : newAdmin});
})


const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    

    if (!email || !password) {
        const error = new AppError('user not found', 400, status.FAIL);
        return next(error);
    }

    const admin = await Admin.findOne({ email: email })
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
        const error = new AppError('email or password in false', 500, status.ERROR);
        next(error);
    }
}
)


const getAllAdmins = asyncWrapper(async (req, res) => {
    const query = req.query
    

    const admins = await Admin.find({}, { '__v': false });
    res.json({
        status: status.SUCCESS,
        data: {
            admins
        }
    })

})
module.exports={register , login , getAllAdmins}
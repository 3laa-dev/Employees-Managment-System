const asyncWrapper = require('../Middlewares/asyncWrapper');
const Manager = require('../Models/Manager.model');
const sendData = require('../utils/sendData');
const status = require('../utils/status');
const bcrypt = require('bcrypt');
const generateJWT = require('../utils/generateJWT');
const Admin = require('../Models/admin.model');
const appError = require('../utils/appError');
const Department = require('../Models/departmens.models');
const { findByIdAndUpdate } = require('../Models/Employee.model');
const {validationResult} = require('express-validator');


const getAllManagers = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })
    if (admin) {
    const managers = await Manager.find({}, { __v: false });
    sendData(res, status.SUCCESS, { Managers: managers });
    }
    const error = new appError("you are not admin");
    next(error);
})
const addManager = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })

    if (admin) {
        const { name, phone, salary, email, password, departmentId } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newManager = new Manager({ name, phone, salary, email, departmentId, password: hashedPassword });
        await newManager.save();
        return sendData(res, status.SUCCESS, newManager);
    }
    const error = new appError("you are not admin");
    next(error);


})
const getManager = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })
    if (admin) {
        const ID = req.params.ID;
        const manager = await Manager.findById(ID, { __v: false });
        if (!manager) {
            const error = new appError("this Manager is not found");
            return next(error);
        }
        sendData(res, status.SUCCESS, { Manager: manager });
    }
    const error = new appError("you are not admin");
    next(error);



})
const login = asyncWrapper(async (req, res, next) => {


    const { email, password } = req.body;


    if (!email || !password) {
        const error = new appError('enter all data', 400, status.FAIL);
        return next(error);
    }

    const manager = await Manager.findOne({ email: email })

    if(!manager){
        const error = new appError('manager is not found', 400, status.FAIL);
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, manager.password)
    const token = await generateJWT({ email: manager.email, id: manager._id });
    manager.token = token;
    if (manager && matchedPassword) {
        sendData(res, status.SUCCESS, { manager: manager });
    } else {
        const error = new appError('email or password in false', 500, status.ERROR);
        next(error);
    }


}
)
const updateManager = asyncWrapper(async (req, res, next) => {
    const ID = req.params.ID;
    const user = req.user;
    var bool = false;
    const admin = await Admin.findOne({ email: user.email })
    const manager = await Manager.findById(ID);
    const manager2 = await Manager.findOne({ email: user.email })
    var isManager = false;
    if(manager.departmentId.toString()===manager2.departmentId.toString()){
        bool = true;
        isManager = true;
    }

    if (admin || bool) {
        
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new appError(errors.array().map(e => e.msg), 400, status.FAIL)
            return next(error);
        }
        const { email } = req.body;

        if (email) {
            const test = await Manager.findOne({ email });
            if (test) {
                const error = new appError("this email is exist", 409, status.FAIL);
                return next(error);
            }
        }


        const { departmentId } = req.body;
        if (departmentId) {
            const department = await Department.findById(departmentId);
            if (!department) {
                const error = new appError("this department is not exist", 409, status.FAIL);
                return next(error);
            }

        }

        const {salary} = req.body;
        if(salary && isManager){
            const error = new appError("The manager cannot chance his salary");
            return next(error)
        }

        
         await Manager.updateOne({_id:req.params.ID} , {...req.body});
        const updated = await Manager.findById(req.params.ID);
        return sendData(res , status.SUCCESS ,{UpdatedManager : updated} )
    }
    const error = new appError("you are not admin");
    next(error);


})
const deleteManager = asyncWrapper(async (req, res, next) => {

    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })
    if (admin) {
        const manager = await Manager.findById(req.params.ID);
        const departmen = await Department.findById(manager.managerId);
        if (departmen) {
            departmen.manager = null;
        }
        await Manager.deleteOne({ _id: req.params.ID });
        sendData(res, status.SUCCESS, { data: null });
    }
    const error = new appError("you are not admin");
    next(error);

})




module.exports = { addManager, login, updateManager, deleteManager, getManager, getAllManagers }



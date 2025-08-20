const Department = require('../Models/departmens.models');
const status = require('../utils/status');
const sendData = require('../utils/sendData');
const asyncWrapper = require('../Middlewares/asyncWrapper');
const Employee = require('../Models/Employee.model');
const appError = require('../utils/appError');
const Manager = require('../Models/Manager.model');
const Admin = require('../Models/admin.model');

const getAllDepatrments = asyncWrapper(async (req, res, next) => {

    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })
    if (admin) {
        const Departments = await Department.find({}, { __v: false });
        sendData(res, status.SUCCESS, { Departments: Departments });
    }
 

});
const getDepartment = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })

    if (admin) {
        const ID = req.params.ID;
        const department = await Department.findById(ID, { __v: false });
        if (!department) {
            const error = new appError("this department is not found");
            return next(error);
        }

        sendData(res, status.SUCCESS, { department: department });
    }
    const error = new appError("you are not admin");
    next(error);
});
const addDepartment = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })
    if (admin) {
        const { name, numberOfEmployees, managerId } = req.body;
        const test = await Department.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });// i = ignore case
        if (test) {
            const error = new appError("this Department is exist", 300, status.FAIL);
            return next(error);
        }
        const manager = await Manager.findById(managerId);
        if (!manager) {
            const error = new appError("this manager is not exist", 300, status.FAIL);
            return next(error);
        }
        
        const newDepartment = new Department({ name, numberOfEmployees, managerId });
        await newDepartment.save();
        manager.departmentId=newDepartment._id;
        await manager.save();
        sendData(res, status.SUCCESS, { newDepartment: newDepartment });
    }
    const error = new appError("you are not admin");
    next(error);

});
const updateDepartment = asyncWrapper(async (req, res, next) => {



    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })

    if (admin) {
        const ID = req.params.ID;
        const { name } = req.body;
        const test = await Department.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });// i = ignore case
        if (test) {
            const error = new appError("this Department is exist", 300, status.FAIL);
            return next(error);
        }
        const manager = await Manager.findById(managerId);
        if (!manager) {
            const error = new appError("this manager is not exist", 300, status.FAIL);
            return next(error);
        }
        await Department.updateOne({ _id: ID }, { ...req.body });
        const updatedDepartment = await Department.findById(ID);
        if (updatedDepartment)
            sendData(res, status.SUCCESS, { updatedDepartment: updatedDepartment })
        else {
            const error = new appError("this Department is not exist");
            next(error);
        }
    }
    const error = new appError("you are not admin");
    next(error);

});
const deleteDepartment = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email })

    if (admin) {
        const department = await Department.findById(req.params.ID);
        const manager = await Manager.findById(department.departmentId);
        if (manager) {
            manager.departmentId = null;
        }
        await Department.deleteOne({ _id: req.params.ID });
        sendData(res, status.SUCCESS, { data: null });
    }
    const error = new appError("you are not admin");
    next(error);
});
const getDepartmentName =asyncWrapper(async (req, res, next) => {
    const ID = req.params.ID;
    const departmen = await Department.findById(ID);
    return res.json({status:status.SUCCESS , name:departmen.name});
});

module.exports = { getAllDepatrments, getDepartment, addDepartment, updateDepartment, deleteDepartment ,getDepartmentName}




const Employee = require('../Models/Employee.model');
const asyncWrapper = require('../Middlewares/asyncWrapper');
const appError = require("../utils/appError");
const sendData = require("../utils/sendData");
const status = require("../utils/status");
const { validationResult } = require('express-validator');
const Department = require('../Models/departmens.models');
const Admin = require('../Models/admin.model');
const Manager = require('../Models/Manager.model');

const getAllEmployees = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email });
    const manager = await Manager.findOne({ email: user.email });
    if (manager) {
        const Employees = await Employee.find({ departmentId: manager.departmentId }, { __v: false });
       return  sendData(res, status.SUCCESS, { Employees: Employees });
    }
    if (admin) {
        const Employees = await Employee.find({}, { __v: false });
      return  sendData(res, status.SUCCESS, { Employees: Employees });
    }
})
const getEmployee = asyncWrapper(async (req, res, next) => {
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email });
    const manager = await Manager.findOne({ email: user.email });
    const ID = req.params.ID;

    if (manager) {
        const employee = await Employee.findById(ID, { __v: false });
        if (!employee) {
            const error = new appError("this employee is not found");
            return next(error);
        }
        if (manager.departmentId.toString() !== employee.departmentId.toString()) {
            const error = new appError("this employee is not in your department");
            return next(error);
        }
        return sendData(res, status.SUCCESS, { Employee: employee });
    }
    if (admin) {
        const employee = await Employee.findById(ID, { __v: false });
     return   sendData(res, status.SUCCESS, { Employee: employee });
        
    }


})
const addEmployee = asyncWrapper(async (req, res, next) => {
    const { name, email, phone, salary, departmentId } = req.body;
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email });
    const manager = await Manager.findOne({ email: user.email });
    var bool = true;
    bool = (admin) ? true : false;
    if (!admin) {
        if (manager) {
            if (manager.departmentId.toString() === departmentId.toString()) {
                bool = true;
            }
        }
    }


    if (bool) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new appError(errors.array().map(e => e.msg), 400, status.FAIL)
            return next(error);
        }
        const test = await Employee.findOne({ email });
        if (test) {
            const error = new Error("this employee allready exist", 400, status.FAIL);
            return next(error);
        }
        const department = await Department.findById(departmentId);
        if (!department) {
            const error = new appError("this this department is not exist", 400, status.FAIL);
            return next(error);
        }
        department.numberOfEmployees++;
        department.save();
        const newEmployee = new Employee({ name, email, salary, phone, departmentId });
        await newEmployee.save();
        return sendData(res, status.SUCCESS, { newEmployee: newEmployee });
    }

    return sendData(res, status.FAIL, { message: "you cannot add data" });


});

const updateEmployee = asyncWrapper(async (req, res, next) => {
    const ID = req.params.ID;
    const user = req.user;

    const admin = await Admin.findOne({ email: user.email });
    const manager = await Manager.findOne({ email: user.email });

    const employee = await Employee.findById(ID);
    if (!employee) {
        const error = new appError("this employee is not exist", 404, status.FAIL);
        return next(error);
    }

    let bool = !!admin;
    let isManager = false;

    if (!bool && manager) {
        if (manager.departmentId.toString() === employee.departmentId.toString()) {
            bool = true;
            isManager = true;
        }
    }

    if (!bool) {
        const error = new appError("only admin and managers can update employees data", 403, status.FAIL);
        return next(error);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new appError(errors.array().map(e => e.msg), 400, status.FAIL);
        return next(error);
    }

    const { email, departmentId } = req.body;

    if (email) {
        const test = await Employee.findOne({ email });
        if (test && test._id.toString() !== ID) {
            const error = new appError("this employee is exist", 409, status.FAIL);
            return next(error);
        }
    }

    if (departmentId) {
        if (isManager) {
            return sendData(res, status.FAIL, "the manager cannot change the employee department");
        }

        const department = await Department.findById(departmentId);
        if (!department) {
            const error = new appError("this department is not exist", 409, status.FAIL);
            return next(error);
        }

        if (departmentId !== employee.departmentId.toString()) {
            department.numberOfEmployees++;
            const oldDepartment = await Department.findById(employee.departmentId);
            if (oldDepartment) {
                oldDepartment.numberOfEmployees--;
                await oldDepartment.save();
            }
            await department.save();
        }
    }

    await Employee.updateOne({ _id: ID }, { ...req.body });

    const updatedEmployee = await Employee.findById(ID);
    if (updatedEmployee) {
        return sendData(res, status.SUCCESS, { updatedEmployee: updatedEmployee });
    } else {
        const error = new appError("this employee is not exist", 404, status.FAIL);
        return next(error);
    }
});

const deleteEmployee = asyncWrapper(async (req, res, next) => {
    const ID = req.params.ID;
    const user = req.user;
    const admin = await Admin.findOne({ email: user.email });
    const manager = await Manager.findOne({ email: user.email });
    const employee = await Employee.findById(ID);

    var bool  = true;
    bool = (admin)?true:false;
    if (!admin) {
        if (manager) {
            if (manager.departmentId.toString() === employee.departmentId.toString()) {
                bool = true;
            }
        }
    }

    if(bool){
        
    const departmentId = employee.departmentId;
    const department = await Department.findById(departmentId);
    department.numberOfEmployees--;
    department.save();
    await Employee.deleteOne({ _id: req.params.ID });
    return sendData(res, status.SUCCESS, { data: null });
    }
    sendData(res , status.FAIL , "only admins and managers can delete employee");
    
})
module.exports = { getAllEmployees, addEmployee, getEmployee, updateEmployee, deleteEmployee }
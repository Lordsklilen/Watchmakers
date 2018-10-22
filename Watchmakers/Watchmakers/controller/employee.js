"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const employee_1 = require("../model/employee");
const Employee = mongoose.model('Employee', employee_1.EmployeeSchema);
class EmployeeController {
    getEmployees(req, res) {
        Employee.find({}, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
    getEmployee(req, res) {
        Employee.findById(req.params.employeeId, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
    addNewEmployee(req, res) {
        let newEmployee = new Employee(req.body);
        newEmployee.save((err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
    updateEmployee(req, res) {
        Employee.findOneAndUpdate({ _id: req.params.employeeId }, req.body, { new: true }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }
    deleteEmployee(req, res) {
        Employee.remove({ _id: req.params.employeeId }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Succesfully deleted employee!' });
        });
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.js.map
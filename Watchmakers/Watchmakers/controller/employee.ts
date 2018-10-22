import * as mongoose from 'mongoose';
import { EmployeeSchema } from '../model/employee';
import { Request, Response } from 'express';

const Employee = mongoose.model('Employee', EmployeeSchema);

export class EmployeeController {
    public getEmployees(req: Request, res: Response) {
        Employee.find({}, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }

    public getEmployee(req: Request, res: Response) {
        Employee.findById(req.params.employeeId, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }

    public addNewEmployee(req: Request, res: Response) {
        let newEmployee = new Employee(req.body);

        newEmployee.save((err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }

    public updateEmployee(req: Request, res: Response) {
        Employee.findOneAndUpdate({ _id: req.params.employeeId }, req.body, { new: true }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee);
        });
    }

    public deleteEmployee(req: Request, res: Response) {
        Employee.remove({ _id: req.params.employeeId }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Succesfully deleted employee!' });
        });
    }
}
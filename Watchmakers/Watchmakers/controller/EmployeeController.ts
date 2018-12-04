import * as mongoose from 'mongoose';
import { EmployeeSchema } from "../model/EmployeeSchema";
import { Request, Response } from 'express';

const Employee = mongoose.model('Employee', EmployeeSchema);

export class EmployeeController {
    
    public getEmployees(req: Request, res: Response) {
        Employee.find({}, (err, employee) => {
            let safeEmployee = [];
            employee.forEach(element => {
                safeEmployee.push(element.toAuthJSON())
            });
            if (err) {
                res.send(err);
            }
            res.json(safeEmployee);
        });
    }

    public getEmployee(req: Request, res: Response) {
        Employee.findById(req.params.employeeId, (err, employee) => {
            console.log("id: " + req.params.employeeId);
            if (err) {
                res.send(err);
            }
            res.json(employee.toAuthJSON());
        });
    }

    public addNewEmployee(req: Request, res: Response) {
        let newEmployee = new Employee(req.body);
        console.log(JSON.stringify(req.body["password"]))
        newEmployee.setPassword(req.body["password"]);
        newEmployee.save()
            .then(() => res.json(newEmployee.toAuthJSON()));
       }

    public updateEmployee(req: Request, res: Response) {
        Employee.findOneAndUpdate({ _id: req.params.employeeId }, req.body, { new: true }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee.toAuthJSON());
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
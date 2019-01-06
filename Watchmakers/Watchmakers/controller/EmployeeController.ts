import * as mongoose from 'mongoose';
import { EmployeeSchema } from "../model/EmployeeSchema";
import { Request, Response } from 'express';

const Employee = mongoose.model('Employee', EmployeeSchema);

export class EmployeeController {
    
    public getEmployees(req: Request, res: Response) {
        Employee.find({}, (err, employee) => {
            let safeEmployee = [];
            employee.forEach(element => {
                safeEmployee.push(//element.toAuthJSON);
                    {
                        "id": element.id,
                        "login": element.login,
                        "name": element.name,
                        "surname": element.surname,
                        "position": element.position
                    }
                )
                
            });
            if (err) {
                res.send(err);
            }
            res.json(safeEmployee);
        });
    }

    public getEmployee(req: Request, res: Response) {
        Employee.findById(req.params.employeeId, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.json(employee.toAuthJSON());
        });
    }
    public LogInEmployee(req: Request, res: Response) {   
        Employee.find({ login: req.body.Login}, (err, employee) => {    
            if (err) {
                res.redirect('/login');
            }
            let emp = employee[0];   
            if(emp && emp.validatePassword(req.body.Password)){
                req["session"].Authorization = employee[0].toAuthJSON()["token"];
                res.redirect('/admin');
            }
            else{
                //console.log("sth goes wrong");
                res.redirect('/login');
            }
        });
    }

    public LogOutEmployee(req: Request, res: Response) {   
        Employee.find({ login: req.body.Login}, (err, employee) => {    
            if (err) {
                res.send(err);
            }
            req["session"].Authorization = "";
            res.redirect('/');
        });
    }
    public addNewEmployee(req: Request, res: Response) {
        let newEmployee = new Employee(req.body);
        newEmployee.setPassword(req.body["password"]);
        newEmployee.save()
            .then(() => res.redirect("/employeeManagement"));
       }

    public updateEmployee(req: Request, res: Response) {
        Employee.findOneAndUpdate({ _id: req.params.employeeId }, req.body, { new: true }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.redirect("/employeeManagement");
        });
    }

    public deleteEmployee(req: Request, res: Response) {
        Employee.remove({ _id: req.params.employeeId }, (err, employee) => {
            if (err) {
                res.send(err);
            }
            res.redirect("/employeeManagement");
        });
    }
}
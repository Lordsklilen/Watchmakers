﻿import { Request, Response,Router } from "express";
import { EmployeeController } from "../controller/employee";
const jwt = require('express-jwt');
const auth = require('../auth');
export class Routes {
    public employeeController: EmployeeController = new EmployeeController();

    public routes(app): void {

        app.route('/current').get(auth.required, (req, res, next) => {
            const { payload: { id } } = req;
            return Employees.findById(id)
                .then((user) => {
                    if (!user) {
                        return res.sendStatus(400);
                    }
                    return res.json({ user: user.toAuthJSON() });
                });
        });



        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request succesfull'
            });
        });

        app.route('/employee').get(this.employeeController.getEmployees);

        app.route('/employee/employee').get(this.employeeController.getEmployee);

        app.route('/employee/update').put(this.employeeController.updateEmployee);

        app.route('/employee/delete').delete(this.employeeController.deleteEmployee);

        app.route('/employee/add').post(this.employeeController.addNewEmployee);
    }
}
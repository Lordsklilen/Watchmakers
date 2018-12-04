import { Request, Response,Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";
const jwt = require('express-jwt');
const auth = require('../auth');
export class Routes {
    public employeeController: EmployeeController = new EmployeeController();

    public routes(app): void {

        app.route('/auth').get(auth.required, (req, res, next) => {
            res.status(200).send({
                message: 'GET request with auth succesfull'
            });
        });



        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request succesfull'
            });
        });

        app.route('/employee').get(this.employeeController.getEmployees);

        app.route('/employee/:employeeId').get(this.employeeController.getEmployee);

        app.route('/employee/update/:employeeId').put(this.employeeController.updateEmployee);

        app.route('/employee/delete/:employeeId').delete(this.employeeController.deleteEmployee);

        app.route('/employee/add').post(this.employeeController.addNewEmployee);
    }
}
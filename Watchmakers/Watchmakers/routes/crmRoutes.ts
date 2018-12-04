import { Request, Response,Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";
const jwt = require('express-jwt');
const auth = require('../auth');
var path = require('path');
export class Routes {
    public employeeController: EmployeeController = new EmployeeController();

    public routes(app): void {

        app.route('/auth').get(auth.required, (req, res, next) => {
            res.status(200).send({
                message: 'GET request with auth succesfull'
            });
        });

        app.route('/employee').get(this.employeeController.getEmployees);

        app.route('/employee/:employeeId').get(this.employeeController.getEmployee);

        app.route('/employee/update/:employeeId').put(this.employeeController.updateEmployee);

        app.route('/employee/delete/:employeeId').delete(this.employeeController.deleteEmployee);

        app.route('/employee/add').post(this.employeeController.addNewEmployee);


        ////pages utils

        app.route('/').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/index.html'));
        });
        app.route('/Item/:itemname').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/singleItem.html'));
        });

        // loading css and js/jquery files
        app.route('*/vendor/bootstrap/css/bootstrap.min.css').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/bootstrap/css/bootstrap.min.css'));
        });
        app.route('*/css/shop-homepage.css').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/css/shop-homepage.css'));
        });
        app.route('*/vendor/jquery/jquery.min.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/jquery/jquery.min.js'));
        });
        app.route('*/vendor/bootstrap/js/bootstrap.bundle.min.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/bootstrap/js/bootstrap.bundle.min.js'));
        });
    }
}
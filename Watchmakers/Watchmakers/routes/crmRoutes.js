"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmployeeController_1 = require("../controller/EmployeeController");
const jwt = require('express-jwt');
const auth = require('../auth');
class Routes {
    constructor() {
        this.employeeController = new EmployeeController_1.EmployeeController();
    }
    routes(app) {
        app.route('/auth').get(auth.required, (req, res, next) => {
            res.status(200).send({
                message: 'GET request with auth succesfull'
            });
        });
        app.route('/').get((req, res) => {
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
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map
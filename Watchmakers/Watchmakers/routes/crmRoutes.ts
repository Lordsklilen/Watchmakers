import { Request, Response } from "express";

import { EmployeeController } from "../controller/employee";

export class Routes {
    public employeeController: EmployeeController = new EmployeeController();

    public routes(app): void {
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request succesfull'
            });
        });

        app.route('/employee').get(this.employeeController.getEmployees);

        app.route('/employee/:employeeId').get(this.employeeController.getEmployee);

        app.route('/employee/:employeeId').put(this.employeeController.updateEmployee);

        app.route('/employee/:employeeId').delete(this.employeeController.deleteEmployee);

        app.route('/employee').post(this.employeeController.addNewEmployee);
    }
}
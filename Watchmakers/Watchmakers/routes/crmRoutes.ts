import { Request, Response,Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";
import { ProductController } from "../controller/ProductController";
const jwt = require('express-jwt');
const auth = require('../config/auth');
const path = require('path');
export class Routes {
    public employeeController: EmployeeController = new EmployeeController();
    public productController: ProductController = new ProductController();

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

        app.route('/product').get(this.productController.getProducts);
        app.route('/product/:productId').get(this.productController.getProduct);
        app.route('/product/update/:productId').put(this.productController.updateProduct);
        app.route('/product/delete/:productId').delete(this.productController.deleteProduct);
        app.route('/product/add').post(this.productController.addProduct);

        //pages routes

        app.route('/').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/index.html'));
        });
        app.route('/Item/:itemname').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/item.html'));
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
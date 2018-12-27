import { Request, Response,Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";
import { ProductController } from "../controller/ProductController";
import { ServiceController } from "../controller/ServiceController";
import { OrderController } from "../controller/OrderController";

const jwt = require('express-jwt');
const auth = require('../config/auth');
const path = require('path');
const multer = require('multer');

export class Routes {
    public employeeController: EmployeeController = new EmployeeController();
    public productController: ProductController = new ProductController();
    public serviceController: ServiceController = new ServiceController();
    public orderController: OrderController = new OrderController();

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
        
        app.route('/loginCheck').post(this.employeeController.LogInEmployee);
        app.route('/logOut').post(this.employeeController.LogOutEmployee);

        app.route('/product').get(this.productController.getProducts);
        app.route('/product/:productId').get(this.productController.getProduct);
        app.route('/product/update/:productId').put(this.productController.updateProduct);
        app.route('/product/delete/:productId').delete(this.productController.deleteProduct);
        app.route('/product/add').post(this.productController.addProduct);
        app.route('/product/add/photo').post(this.productController.uploadPhoto);

        app.route('/service').get(this.serviceController.getServices);
        app.route('/service/:serviceId').get(this.serviceController.getService);
        app.route('/service/add').post(this.serviceController.addService);

        app.route('/order').get(this.orderController.getOrders);
        app.route('/order/:orderId').get(this.orderController.getOrder);
        app.route('/order/add').post(this.orderController.addOrder);


        
        //pages routes

        app.route('/').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/index.html'));
        });
        app.route('/Login').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/Login.html'));
        });
        app.route('/Admin').get(auth.required,(req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/Admin.html'));
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
        app.route('*/js/LoginScripts.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/js/LoginScripts.js'));
        });
        app.route('*/vendor/jquery/jquery.min.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/jquery/jquery.min.js'));
        });
        app.route('*/vendor/bootstrap/js/bootstrap.bundle.min.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/bootstrap/js/bootstrap.bundle.min.js'));
        });
    }
}
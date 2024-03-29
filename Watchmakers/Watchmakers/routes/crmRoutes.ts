﻿import { Request, Response,Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";
import { ProductController } from "../controller/ProductController";
import { ServiceController } from "../controller/ServiceController";
import { OrderController } from "../controller/OrderController";

const jwt = require('express-jwt');
const auth = require('../config/auth');
const path = require('path');
const upload = require('../config/upload');

var mapDir = require('node-map-directory');

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

        //api
        app.route('/api/employees').get(auth.required,this.employeeController.getEmployees);
        app.route('/api/employee/:employeeId').get(auth.required,this.employeeController.getEmployee);
        app.route('/api/employee/update/:employeeId').post(auth.required,this.employeeController.updateEmployee);
        app.route('/api/employee/delete/:employeeId').post(auth.required,this.employeeController.deleteEmployee);
        app.route('/api/employee/add').post(auth.required,this.employeeController.addNewEmployee);
        
        app.route('/api/loginCheck').post(this.employeeController.LogInEmployee);
        app.route('/api/logOut').post(auth.required,this.employeeController.LogOutEmployee);

        app.route('/api/products').get(this.productController.getProducts);
        app.route('/api/product/:productId').get(this.productController.getProduct);
        app.route('/api/product/update/:productId').put(auth.required,this.productController.updateProduct);
        app.route('/api/product/delete/:productId').delete(auth.required,this.productController.deleteProduct);
        app.route('/api/product/add').post(auth.required,upload.single('photo'), this.productController.addProduct);

        app.route('/api/services').get(this.serviceController.getServices);
        app.route('/api/service/:serviceId').get(this.serviceController.getService);
        app.route('/api/service/add').post(this.serviceController.addService);

        app.route('/api/orders').get(this.orderController.getOrders);
        app.route('/api/order/:orderId').get(this.orderController.getOrder);
        app.route('/api/order/add').post(this.orderController.addOrder);
        app.route('/api/order/update/:orderId').post(auth.required,this.orderController.updateOrder);

        app.route('/api/order/delete/:orderId').post(auth.required,this.orderController.deleteOrder);
        app.route('/api/order/approve/:orderId').post(auth.required,this.orderController.approveOrder);
        app.route('/api/order/cancel/:orderId').post(auth.required,this.orderController.cancelOrder);
        app.route('/api/order/complete/:orderId').post(auth.required,this.orderController.completedOrder);
        app.route('/api/order/ready/:orderId').post(auth.required,this.orderController.readyOrder);
      


        
        //pages routes

        app.route('/').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/index.html'));
        });
        
        app.route('/error').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/errorPage.html'));
        });
        app.route('/login').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/login.html'));
        });
        app.route('/admin').get(auth.required,(req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/admin.html'));
        });
        app.route('/item/:itemname').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/item.html'));
        });
        app.route('/productManagement').get(auth.required,(req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/productManagement.html'));
        });
        app.route('/employeeManagement').get(auth.required,(req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/employeeManagement.html'));
        });
        app.route('/orderManagement').get(auth.required,(req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/orderManagement.html'));
        });
        app.route('/product/:id').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/product.html'));
        });
        app.route('/order/status/:id').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/orderStatus.html'));
        });
        app.route('/order/:id').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/order.html'));
        });

        // loading css and js/jquery files
        app.route('*/vendor/bootstrap/css/bootstrap.min.css').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/bootstrap/css/bootstrap.min.css'));
        });
        app.route('*/css/shop-homepage.css').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/css/shop-homepage.css'));
        });
        app.route('*/js/employeeGetter.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/js/employeeGetter.js'));
        }); 
        app.route('*/js/orderGetter.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/js/orderGetter.js'));
        });
        app.route('*/vendor/jquery/jquery.min.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/jquery/jquery.min.js'));
        });
        app.route('*/vendor/bootstrap/js/bootstrap.bundle.min.js').get((req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname + '/../../views/vendor/bootstrap/js/bootstrap.bundle.min.js'));
        });
    }
}
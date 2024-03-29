import * as mongoose from 'mongoose';
import { OrderSchema, OrderStatus } from "../model/OrderSchema";
import { Request, Response } from 'express';

const Order = mongoose.model('Order', OrderSchema);

export class OrderController {

    public getOrders(req: Request, res: Response) {
        Order.find({}, (err, orders) => {
            if (err) {
                res.send(err);
            }
            res.json(orders);
        });
    }

    public getOrder(req: Request, res: Response) {
        Order.findById(req.params.orderId, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }

    public addOrder(req: Request, res: Response) {
        let newOrder = new Order({
            productId: req.body["productId"],
            status: OrderStatus[OrderStatus.PENDING_APPROVAL],
            name: req.body["name"],
            surname: req.body["surname"],
            phone: req.body["phone"]
        });
        newOrder.save()
            .then(() => {
                res.redirect('/order/status/' + newOrder["_id"]);
            });
    }

    public updateOrder(req: Request, res: Response) {
        Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true }, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.redirect('/orderManagement');
        });
    }

    public deleteOrder(req: Request, res: Response) {
        Order.remove({ _id: req.params.orderId }, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.redirect('/orderManagement');
        });
    }
    public approveOrder(req: Request, res: Response) {
        Order.findById(req.params.orderId, (err, order) => {
            if (err) {
                res.send(err);
            }
            order.status = OrderStatus[OrderStatus.APPROVED];
            Order.findOneAndUpdate({ _id: req.params.orderId }, order, { new: true }, (err, order) => {
                if (err) {
                    res.send(err);
                }
                res.redirect('/orderManagement');
            });
        });
    }
    public cancelOrder(req: Request, res: Response) {
        Order.findById(req.params.orderId, (err, order) => {
            if (err) {
                res.send(err);
            }
            order.status = OrderStatus[OrderStatus.CANCELED];
            Order.findOneAndUpdate({ _id: req.params.orderId }, order, { new: true }, (err, order) => {
                if (err) {
                    res.send(err);
                }
                res.redirect('/orderManagement');
            });
        });
    }
    public completedOrder(req: Request, res: Response) {
        Order.findById(req.params.orderId, (err, order) => {
            if (err) {
                res.send(err);
            }
            order.status = OrderStatus[OrderStatus.COMPLETED];
            Order.findOneAndUpdate({ _id: req.params.orderId }, order, { new: true }, (err, order) => {
                if (err) {
                    res.send(err);
                }
                res.redirect('/orderManagement');
            });
        });
    }
    public readyOrder(req: Request, res: Response) {
        Order.findById(req.params.orderId, (err, order) => {
            if (err) {
                res.send(err);
            }
            order.status = OrderStatus[OrderStatus.READY_IN_SHOP];
            Order.findOneAndUpdate({ _id: req.params.orderId }, order, { new: true }, (err, order) => {
                if (err) {
                    res.send(err);
                }
                res.redirect('/orderManagement');
            });
        });
    }
}
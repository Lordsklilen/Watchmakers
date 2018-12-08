import * as mongoose from 'mongoose';
import { OrderSchema } from "../model/OrderSchema";
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
        let newOrder = new Order(req.body);
        newOrder.save()
            .then(() => res.json(newOrder));
    }

    public updateOrder(req: Request, res: Response) {
        Order.findOneAndUpdate({ _id: req.params.orderId }, req.body, { new: true }, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json(order);
        });
    }

    public deleteOrder(req: Request, res: Response) {
        Order.remove({ _id: req.params.productId }, (err, order) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Succesfully deleted product!' });
        });
    }
}
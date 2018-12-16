import * as mongoose from 'mongoose';
import { ProductSchema } from "../model/ProductSchema";
import { Request, Response } from 'express';

var upload = require("../config/multer");

const Product = mongoose.model('Product', ProductSchema);

export class ProductController {

    public getProducts(req: Request, res: Response) {
        Product.find({}, (err, products) => {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    }

    public getProduct(req: Request, res: Response) {
        Product.findById(req.params.productId, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }

    public addProduct(req: Request, res: Response) {
        let newProduct = new Product(req.body);
        newProduct.save()
            .then(() => res.json(newProduct));
    }

    public uploadPhoto(req: Request, res: Response) {
        upload(req, res, (req, res) => {
            if(err){
                return res.end("Something went wrong!");
            }
            return res.end("File uploaded succesfully!");
        })
    }

    public updateProduct(req: Request, res: Response) {
        Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true }, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }

    public deleteProduct(req: Request, res: Response) {
        Product.remove({ _id: req.params.productId }, (err, product) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Succesfully deleted product!' });
        });
    }
}
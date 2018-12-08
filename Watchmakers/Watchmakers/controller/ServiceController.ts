import * as mongoose from 'mongoose';
import { ServiceSchema } from "../model/ServiceSchema";
import { Request, Response } from 'express';

const Service = mongoose.model('Service', ServiceSchema);

export class ServiceController {

    public getServices(req: Request, res: Response) {
        Service.find({}, (err, services) => {
            if (err) {
                res.send(err);
            }
            res.json(services);
        });
    }

    public getService(req: Request, res: Response) {
        Service.findById(req.params.serviceId, (err, service) => {
            if (err) {
                res.send(err);
            }
            res.json(service);
        });
    }

    public addService(req: Request, res: Response) {
        let newService = new Service(req.body);
        newService.save()
            .then(() => res.json(newService));
    }

    public updateService(req: Request, res: Response) {
        Service.findOneAndUpdate({ _id: req.params.serviceId }, req.body, { new: true }, (err, service) => {
            if (err) {
                res.send(err);
            }
            res.json(service);
        });
    }

    public deleteService(req: Request, res: Response) {
        Service.remove({ _id: req.params.serviceId }, (err, service) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Succesfully deleted product!' });
        });
    }
}
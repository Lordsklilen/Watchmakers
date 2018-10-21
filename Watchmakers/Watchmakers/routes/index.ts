import * as express from "express";
import { Logic } from "../Logic";
import { IRepository } from "../Repository/IRepository";
import { WorkersRepository } from "../Repository/WorkersRepository";

const router = express.Router();
let workerRepository = new WorkersRepository();
let engineLogic = new Logic(workerRepository);


router.get("/", (req: express.Request, res: express.Response) => {
    res.render("index", { title: "Express" });
});

router.get("/Workers", function (req, res) {
    res.status(200).send({ message: engineLogic.getAllWorkers()});
});
router.get("/Workers/:id", function (req, res) {
    res.status(200).send({ message: engineLogic.getSingleWorker(req.params["id"])});
});

export default router;
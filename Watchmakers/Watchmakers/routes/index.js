"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Logic_1 = require("../Logic");
const WorkersRepository_1 = require("../Repository/WorkersRepository");
const router = express.Router();
let workerRepository = new WorkersRepository_1.WorkersRepository();
let engineLogic = new Logic_1.Logic(workerRepository);
router.get("/", (req, res) => {
    res.render("index", { title: "Express" });
});
router.get("/Workers", function (req, res) {
    res.status(200).send({ message: engineLogic.getAllWorkers() });
});
router.get("/Workers/:id", function (req, res) {
    res.status(200).send({ message: engineLogic.getSingleWorker(req.params["id"]) });
});
exports.default = router;
//# sourceMappingURL=index.js.map
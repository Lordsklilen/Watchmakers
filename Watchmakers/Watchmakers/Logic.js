"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logic {
    constructor(workerRepo) {
        this.workerRepo = workerRepo;
    }
    getSingleWorker(id) {
        return this.workerRepo.getById(id);
    }
    getAllWorkers() {
        return this.workerRepo.list();
    }
}
exports.Logic = Logic;
//# sourceMappingURL=Logic.js.map
import { IRepository } from "./Repository/IRepository";
export class Logic {
    workerRepo: IRepository;
    constructor(workerRepo: IRepository) {
        this.workerRepo = workerRepo;
    }
    getSingleWorker(id: number) :any{
        return this.workerRepo.getById(id);
    }
    getAllWorkers():any[]{
        return this.workerRepo.list();
    }

}
import { IRepository } from "./IRepository";

export class WorkersRepository implements IRepository {
    getById(id: number) {
        //throw new Error("Not implemented"); 
        //test without database, not a final code
        let obj = {};
        obj["id"] = id;
        obj["name"] = "Damian";
        obj["surname"] = "Hałatek";
        obj["Position"] = "sex toy";
        return obj;
    }

    list(): any[] {
        // throw new Error("Not implemented");
        //test without database, not a final code
        let list = [];
        let obj1 = {};
        obj1["id"] = 1;
        obj1["name"] = "Damian";
        obj1["surname"] = "Hałatek";
        obj1["Position"] = "sex toy";
        let obj2 = {};
        obj2["id"] = 2;
        obj2["name"] = "Michał";
        obj2["surname"] = "Dela";
        obj2["Position"] = "CEO";
        list.push(obj1);
        list.push(obj2);
        return list;
    }

    add(entity) {}

    delete(entity) {}

    edit(entity) {}
}
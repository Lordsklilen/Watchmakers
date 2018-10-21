export interface IRepository {
    getById(id:number):any;
    list():any[];
    add(entity:any);
    delete(entity:any);// można zmienić na delete by id
    edit(entity:any);
}

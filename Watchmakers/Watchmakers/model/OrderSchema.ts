import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    productId: String,
    status: {
        type: String,
        enum: OrderStatus
    },
    name: String,
    surname: String,
    phone: String
});
export enum OrderStatus{
    PENDING_APPROVAL,
    APPROVED,
    CANCELED
}
mongoose.model('Order', OrderSchema);
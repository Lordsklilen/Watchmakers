import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    productId: String,
    status: {
        type: String,
        enum: ['PENDING_APPROVAL',
            'APPROVED',
            'CANCELED',
            'READY_IN_SHOP',
            'COMPLETED']
    },
    name: String,
    surname: String,
    phone: String
});

export enum OrderStatus{
    PENDING_APPROVAL,
    APPROVED,
    CANCELED,
    READY_IN_SHOP,
    COMPLETED
}

mongoose.model('Order', OrderSchema);
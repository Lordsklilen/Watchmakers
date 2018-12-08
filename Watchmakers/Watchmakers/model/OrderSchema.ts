import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    productId: String,
    status: Number,
    name: String,
    surname: String,
    phone: String
});

mongoose.model('Order', OrderSchema);
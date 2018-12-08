import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProductSchema = new Schema({
    manufacturer: String,
    model: String,
    description: String
});

mongoose.model('Product', ProductSchema);
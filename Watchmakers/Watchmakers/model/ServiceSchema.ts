import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ServiceSchema = new Schema({
    manufacturer: String,
    model: String,
    description: String,
    status: Number,
    employeeId: String
});

mongoose.model('Service', ServiceSchema);
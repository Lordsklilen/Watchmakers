import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EmployeeSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: 'Enter name'
    },
    surname: {
        type: String,
        required: 'Enter surname'
    },
    position: {
        type: String
    }
})
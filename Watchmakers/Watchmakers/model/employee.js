"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.EmployeeSchema = new Schema({
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
});
//# sourceMappingURL=employee.js.map
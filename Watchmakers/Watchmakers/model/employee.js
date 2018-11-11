"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.EmployeeSchema = new Schema({
    name: String,
    surname: String,
    position: String,
    password: String,
    hash: String,
    salt: String,
});
//# sourceMappingURL=employee.js.map
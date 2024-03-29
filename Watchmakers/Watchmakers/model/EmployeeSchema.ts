﻿import * as mongoose from 'mongoose';
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

export const EmployeeSchema = new Schema({
    name: String,
    surname: String,
    login: String,
    position: String,
    hash: String,
    salt: String,
})
EmployeeSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

EmployeeSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

EmployeeSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        login: this.login,
        id: this._id,
        exp: expirationDate.getTime() / 1000,
    }, 'secret');
}

EmployeeSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        login: this.login,
        token: this.generateJWT(),
        name: this.name,
        surname: this.surname,
        position: this.position
    };
};

mongoose.model('Employee', EmployeeSchema);
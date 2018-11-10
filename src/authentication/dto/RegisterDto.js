"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDtoRules = {
    userName: {
        presence: true,
        length: { minimum: 6 }
    },
    password: {
        presence: true,
        length: { minimum: 6 }
    },
    email: {
        presence: true,
        length: { minimum: 6 }
    },
    firstName: {
        presence: true,
        length: { minimum: 6 }
    },
    lastName: {
        presence: true,
        length: { minimum: 6 }
    },
    birthDate: {
        presence: true,
        length: { minimum: 6 }
    },
    gender: {
        presence: true,
        length: { minimum: 6 }
    }
};

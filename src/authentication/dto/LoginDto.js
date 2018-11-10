"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDtoRules = {
    user: {
        presence: true,
        length: {
            minimum: 6,
        }
    },
    password: {
        presence: true,
        length: {
            minimum: 6
        }
    }
};

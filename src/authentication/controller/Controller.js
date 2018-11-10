"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Validation_1 = require("../../common/utils/Validation");
const LoginDto_1 = require("../dto/LoginDto");
const Service_1 = require("../services/Service");
const AppResponse_1 = require("../../common/utils/AppResponse");
const service = new Service_1.Service();
class Controller {
    constructor() {
        this.router = express_1.Router();
        this.router.post('/login', this.login);
    }
    login(req, res) {
        Validation_1.Validate(req.body, LoginDto_1.LoginDtoRules)
            .then(e => e)
            .then(e => service.login(e))
            .then(e => res.status(200).send(e))
            .catch(e => res.sendStatus(400).send(AppResponse_1.AppResponse.errorResponse(e)));
    }
}
exports.Controller = Controller;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_js_1 = __importDefault(require("validate.js"));
const ValidationException_1 = require("../errorHandling/Exceptions/ValidationException");
function Validate(x, constraint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            x = validate_js_1.default.cleanAttributes(x, constraint);
            const res = validate_js_1.default(x, constraint, { format: 'flat' });
            if (res === undefined) {
                return x;
            }
            else {
                throw ValidationException_1.ValidationException.ValidateRequestException('');
            }
        }
        catch (e) {
            throw e;
        }
    });
}
exports.Validate = Validate;

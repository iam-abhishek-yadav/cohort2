"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const requestCount_1 = require("./requestCount");
const metricsMiddleware = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", function () {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);
        requestCount_1.requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode,
        });
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;

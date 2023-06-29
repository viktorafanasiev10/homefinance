"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_router_1 = require("./user.router");
router.use('/users', user_router_1.userRouter);
exports.default = router;

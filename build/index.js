"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./config/database");
const models_1 = require("./models");
const router_1 = __importDefault(require("./router"));
const logger_1 = __importDefault(require("./config/logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    models_1.User.findOne({ where: { username: username } })
        .then(user => {
        if (!user)
            return done(null, false);
        bcryptjs_1.default.compare(password, user.password, (err, result) => {
            if (err)
                throw err;
            if (result) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    })
        .catch(err => done(err));
}));
passport_1.default.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport_1.default.deserializeUser((id, cb) => {
    models_1.User.findByPk(id)
        .then(user => cb(null, user))
        .catch(err => cb(err));
});
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((req, res, next) => {
    logger_1.default.child({ body: req.body }).info(`Received ${req.method} request for ${req.url}`);
    next();
});
app.use('/api', router_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("module-alias/register");
// Carga las variables de entorno. Se pueden usar en todo el proyecto. 
require("dotenv/config");
// Carga la conexion a la bbdd
const bd_1 = require("./config/bd");
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const helmet_1 = __importDefault(require("helmet"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const logger_1 = __importDefault(require("./utils/logger"));
const tasks_routes_1 = __importDefault(require("./routes/tasks.routes"));
const app = (0, express_1.default)();
(0, bd_1.connectDB)();
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use((0, helmet_1.default)());
// Permite leer los datos que vienen de un formulario
app.use(express_1.default.json());
app.use('/tasks', tasks_routes_1.default);
app.use('/', (req, res) => {
    res.send('Server is running...');
    logger_1.default.info('server is running...');
});
app.use(error_middleware_1.default);
exports.default = app;

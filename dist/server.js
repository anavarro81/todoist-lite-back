"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Carga las variables de entorno. Se pueden usar en todo el proyecto. 
require("dotenv/config");
// Carga la conexion a la bbdd
// import {connectDB} from './config/bd'
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
// connectDB();
app.use((0, cors_1.default)(cors_2.corsConfig));
app.use((0, helmet_1.default)());
// Permite leer los datos que vienen de un formulario
app.use(express_1.default.json());
app.use('/', (req, res) => {
    res.send('Server is running...');
});
exports.default = app;

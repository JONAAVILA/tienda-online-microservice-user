import express from "express";
import router from "./routes/index.js";
import morgan from "morgan";
import cors from 'cors';
import { limiterCodes,limiterLogin } from './utils/limiter.js';

const server = express();
const corsOptions = {
    origin: ['http://localhost:4321', 'https://tienda-online-backend-riqf.onrender.com'], // Agrega los dominios permitidos
    methods: ['GET', 'POST'], // Agrega los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Agrega los headers permitidos
};

server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));

server.use('/singin/check/code',limiterCodes)
server.use('/login/signin',limiterLogin)

server.use(router);

export default server;

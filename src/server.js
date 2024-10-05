import express from "express";
import router from "./routes/index.js";
import morgan from "morgan";
import cors from 'cors';
import { limiterCodes, limiterLogin } from './utils/limiter.js';
import cookieParser from 'cookie-parser';

const server = express();
const corsOptions = {
    origin: ['http://localhost:3000', 'https://tienda-online-backend-riqf.onrender.com'],
    credentials:true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

server.use(cookieParser())
server.use(morgan("dev"));
server.use(express.json());
server.use(cors(corsOptions));

server.use('/singin/check/code',limiterCodes)
server.use('/login/signin',limiterLogin)

server.use(router);

export default server;

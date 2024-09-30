import express from "express";
import router from "./routes/index.js";
import morgan from "morgan";
import cors from 'cors';
import { limiterCodes,limiterLogin } from './utils/limiter.js';

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use('/singin/check/code',limiterCodes)
server.use('/login/signin',limiterLogin)

server.use(router);

export default server;
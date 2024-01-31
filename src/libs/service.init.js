import express from 'express'
import { router as v1 } from '../v1/router/router.js';
import { SERVICE_LOCAL_PORT, NODE_ENV } from '../constant/config.js';
import cors from 'cors';

const httpServer = new express();

const serverInit = () => {
    httpServer.use(express.urlencoded({ extended: true }));
    httpServer.use(express.json());
    httpServer.use(cors())
    httpServer.use('/v1', v1)
}

export { serverInit, httpServer, SERVICE_LOCAL_PORT, NODE_ENV }

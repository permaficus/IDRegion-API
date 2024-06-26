import express from 'express'
import { router as v1 } from '../v1/router/router.js';
import { SERVICE_LOCAL_PORT, NODE_ENV, allowedOrigin } from '../constant/config.js';
import cors from 'cors';
import { PathNotFound, badRequest } from '../v1/middleware/httpErrHandler.js';
import apiDocs from '../api-docs/docs.json' assert { type: 'json' };
import swaggerUi from 'swagger-ui-express';

const httpServer = new express();

const serverInit = () => {
    httpServer.use(express.urlencoded({ extended: true }));
    httpServer.use(express.json());
    httpServer.use(cors({
        ...allowedOrigin.length !== 0 ? { origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (!allowedOrigin.includes(origin)) {
                const error = new Error(`Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at ${origin}.`);
                delete error.stack
                return callback(error, false)
            }
            return callback(null, true)
        }} : {}
    }));
    httpServer.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs, { customSiteTitle: 'ID-REGION API Documentation' }));
    httpServer.use('/api/v1', v1);
    httpServer.use(badRequest);
    httpServer.use('*', PathNotFound);
}

export { serverInit, httpServer, SERVICE_LOCAL_PORT, NODE_ENV }

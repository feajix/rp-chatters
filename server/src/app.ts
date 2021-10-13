import express, { Express, Request, Response } from 'express';
import path from 'path';
import apiRouter from './routes/index';

const app: Express = express();
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../../client/dist')));
app.use('api', apiRouter);

export = app;

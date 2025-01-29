import express from 'express';
import cors from 'cors';

const app = express();
const prefix = '/api/v1';

const projectRoutes = require('./routes/projects');
const specialRoutes = require('./routes/special');

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(`${prefix}`, specialRoutes);
app.use(`${prefix}/projects`, projectRoutes);

module.exports = app;
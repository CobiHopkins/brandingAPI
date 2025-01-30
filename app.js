const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const projectRoutes = require('./routes/projects.js');
const specialRoutes = require('./routes/special.js');

const app = express();
const prefix = '/api/v1';

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors(corsOptions));
app.use(`${prefix}`, specialRoutes);
app.use(`${prefix}/projects`, projectRoutes);

module.exports = app;
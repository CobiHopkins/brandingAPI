require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const projectRoutes = require('./routes/projects.js');
const specialRoutes = require('./routes/special.js');
const tagRoutes = require('./routes/tags.js');
const authRoutes = require('./routes/auth.js');

const { corsInfo, serverInfo } = require('./config');

const app = express();
const prefix = `/api/v${serverInfo.apiVersion}`;

const corsOptions = {
    origin: corsInfo.origin,
    optionsSuccessStatus: corsInfo.optionsSuccessStatus
}

app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors(corsOptions));
app.use(`${prefix}`, specialRoutes);
app.use(`${prefix}/projects`, projectRoutes);
app.use(`${prefix}/tags`, tagRoutes);
app.use(`${prefix}/auth`, authRoutes);

module.exports = app;
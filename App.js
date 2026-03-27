require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const ProjectRoutes = require('./routes/ProjectRoutes');
const SpecialRoutes = require('./routes/SpecialRoutes');
const TagRoutes = require('./routes/TagRoutes')

const { corsInfo, serverInfo } = require('./config');

const app = express();
const prefix = `/api/v${serverInfo.apiVersion}`;

const corsOptions = {
    origin: corsInfo.origin,
    optionsSuccessStatus: corsInfo.optionsSuccessStatus
}

app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors(corsOptions));
app.use(`${prefix}`, SpecialRoutes);
app.use(`${prefix}/projects`, ProjectRoutes);
app.use(`${prefix}/tags`, TagRoutes);

module.exports = app;
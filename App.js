require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit');

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

const limiter = rateLimit({ 
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
});

app.use(cors(corsOptions));
app.use(limiter);
app.use(bodyParser.json({ limit: '10mb' }))
app.use(`${prefix}`, SpecialRoutes);
app.use(`${prefix}/projects`, ProjectRoutes);
app.use(`${prefix}/tags`, TagRoutes);

module.exports = app;
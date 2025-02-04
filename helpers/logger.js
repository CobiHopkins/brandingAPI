const winston = require('winston');
require('winston-daily-rotate-file');

const { logging } = require('../config');

exports.logger = winston.createLogger({
    level: logging.defaultLevel,
    transports: [
        new winston.transports.DailyRotateFile({
            filename: logging.filename,
            datePattern: logging.datePattern,
            maxSize: logging.maxSize,
            maxFiles: logging.maxFiles,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: logging.exceptionFileName
        })
    ]
});
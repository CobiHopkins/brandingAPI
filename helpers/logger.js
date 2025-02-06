const { loggingInfo } = require('../config');
const winston = require('winston');
require('winston-daily-rotate-file');

exports.logger = winston.createLogger({
    level: loggingInfo.defaultLevel,
    transports: [
        new winston.transports.DailyRotateFile({
            filename: loggingInfo.filename,
            datePattern: loggingInfo.datePattern,
            maxSize: loggingInfo.maxSize,
            maxFiles: loggingInfo.maxFiles,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: loggingInfo.exceptionFileName
        })
    ]
});
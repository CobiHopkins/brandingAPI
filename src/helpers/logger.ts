import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { loggingInfo } from "../config";
require('winston-daily-rotate-file');

export const logger = winston.createLogger({
    level: loggingInfo.defaultLevel,
    format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
    transports: [
        new DailyRotateFile({
            filename: loggingInfo.filename,
            datePattern: loggingInfo.datePattern,
            maxSize: loggingInfo.maxSize,
            maxFiles: loggingInfo.maxFiles,
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: loggingInfo.exceptionFileName
        })
    ]
});
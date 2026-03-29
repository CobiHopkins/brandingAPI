export const databaseInfo = {
    host: 'localhost',
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_password,
    connection_limit: 100
}

export const serverInfo = {
    port: process.env.API_PORT,
    apiVersion: 1,
    prefix: 'api/v1'
}

export const loggingInfo = {
    defaultLevel: 'info',
    filename: 'logs/application-%DATE$.log',
    exceptionFileName: 'logs/uncaught_exceptions.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
}

export const corsInfo = {
    origin: process.env.CORS_ORIGINS,
    optionsSuccessStatus: 200
}
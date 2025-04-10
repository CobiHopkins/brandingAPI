
  exports.databaseInfo = {
    host: "name",
    port: "port",
    user: "username",
    password: "password",
    database: "dbname",
    connection_limit: "connectionLimit",
  }
  
  exports.jwtInfo = {
    secret_key: "secret here",
    expiration: "1w"
  }
  
  exports.serverInfo = {
    port: "port number",
    apiVersion: 1
  }
  
  exports.loggingInfo = {
    defaultLevel: 'logging info',
    filename: 'location / file to log to',
    exceptionFileName: 'name for exception location / file',
    datePattern: 'YYYY-MM-DD',
    maxSize: 'max size of log file',
    maxFiles: 'keep files for how long'
  }
  
  exports.corsInfo = {
    origin: "origin for cors",
    optionsSuccessStatus: 200
  }

  exports.jestData = {
    validJwt: ''
  }
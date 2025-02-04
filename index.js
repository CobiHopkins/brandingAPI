const app = require('./app.js');
const { serverInfo } = require('./config.js');

const port = serverInfo.port || 3030;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
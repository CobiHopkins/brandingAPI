const app = require('./app.js');
const { server } = require('./config.js');

const port = server.port || 3030;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
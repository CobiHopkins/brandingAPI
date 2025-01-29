import { app } from './app';
import { server } from './config';

const port = server.port || 3030;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
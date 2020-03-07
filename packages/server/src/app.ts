import * as express from 'express';
import * as bodyParser from 'body-parser';
import { port as serverPort } from './env';
import router from './controllers/router';

const app: express.Application = express();
const port = serverPort;

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '40mb'
}));

app.use(bodyParser.json({ limit: '40mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', router);

app.listen(port, () =>
    console.log('Server started in port' + port));

module.exports = app;
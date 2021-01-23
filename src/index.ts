import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import './helpers/mongoConnection';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

const app = express();
app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port: string | number = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is listening on PORT: ${port}`));

import express, { Express } from 'express';
import { AddressInfo } from 'net'
import cors from 'cors';
import dotenv from 'dotenv';
import { candidatesRouter } from './controller/routes/candidatesRouter';

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/candidates', candidatesRouter);

const server = app.listen(3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.error(`Failed to run server`)
    }
});
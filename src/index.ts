import express from 'express';
import { router } from './routes';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
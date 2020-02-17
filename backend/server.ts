import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './routes/routes';

const app: express.Application = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../..', 'frontend', 'dist')));
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../..', 'frontend', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`App is listening on port ${3000}`);
});

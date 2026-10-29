import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { payseraApiMiddleware } from './server/paysera.js';

const app = express();
const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;

app.use('/api/paysera', payseraApiMiddleware);
app.use(express.static(path.join(rootDirectory, 'dist')));
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(rootDirectory, 'dist', 'index.html'));
  console.log("Running")
});

app.listen(port, '0.0.0.0', () => {
  console.info(`Campfire app listening on port ${port}`);
});

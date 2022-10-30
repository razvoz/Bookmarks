import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pageInfoRoutes from './routes/pageinfo.js';
import bookmarksRoutes from './routes/bookmarks.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use('/api/pageinfo', pageInfoRoutes);
app.use('/api/bookmarks', bookmarksRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`server is listening on port ${PORT}`);
});
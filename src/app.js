import express from 'express';
import urlRoutes from './routes/url.route.js';
import path from 'path';


const app = express();

app.use(express.json());

app.set('views', path.join(path.resolve(), 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/',urlRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

export default app;
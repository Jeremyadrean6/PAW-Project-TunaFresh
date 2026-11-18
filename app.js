const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const chatRoutes = require('./routes/chat.routes');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/api', chatRoutes);

app.use((req, res) => req.originalUrl.startsWith('/api')
  ? res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' })
  : res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' }));

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
  }
  res.status(500).send('Terjadi kesalahan pada server.');
});

module.exports = app;
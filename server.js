require('dotenv').config();
const app = require('./app');
const db = require('./config/database');
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.query('SELECT 1');
    console.log('Koneksi PostgreSQL berhasil.');
    app.listen(PORT, () => console.log(`TunaFresh berjalan di http://localhost:${PORT}`));
  } catch (err) {
    console.error('Koneksi database gagal:', err.message);
    process.exit(1);
  }
}
start();
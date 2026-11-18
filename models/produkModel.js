const db = require('../config/database');

async function getAll() {
  const result = await db.query('SELECT * FROM produk ORDER BY id ASC');
  return result.rows;
}
async function getById(id) {
  const result = await db.query('SELECT * FROM produk WHERE id = $1', [id]);
  return result.rows[0];
}
async function create(data) {
  const sql = `INSERT INTO produk (nama,kategori,deskripsi,harga,satuan,stok)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [data.nama, data.kategori, data.deskripsi || '', data.harga, data.satuan, data.stok];
  const result = await db.query(sql, values);
  return result.rows[0];
}
async function update(id, data) {
  const sql = `UPDATE produk SET nama=$1,kategori=$2,deskripsi=$3,harga=$4,satuan=$5,stok=$6,
    updated_at=CURRENT_TIMESTAMP WHERE id=$7 RETURNING *`;
  const values = [data.nama, data.kategori, data.deskripsi || '', data.harga, data.satuan, data.stok, id];
  const result = await db.query(sql, values);
  return result.rows[0];
}
async function remove(id) {
  const result = await db.query('DELETE FROM produk WHERE id=$1 RETURNING id', [id]);
  return result.rows[0];
}
module.exports = { getAll, getById, create, update, remove };
const db = require('../config/database');
const model = require('../models/produkModel');

function validate(data) {
  if (!data.nama || !String(data.nama).trim()) return 'Nama produk wajib diisi.';
  if (!['Ikan Segar', 'Produk Olahan'].includes(data.kategori)) return 'Kategori tidak valid.';
  if (data.harga === '' || data.harga === undefined || !Number.isFinite(Number(data.harga)) || Number(data.harga) < 0) return 'Harga harus angka minimal 0.';
  if (!data.satuan || !String(data.satuan).trim()) return 'Satuan wajib diisi.';
  if (data.stok === '' || data.stok === undefined || !Number.isInteger(Number(data.stok)) || Number(data.stok) < 0) return 'Stok harus bilangan bulat minimal 0.';
  return null;
}

async function status(req, res, next) {
  try {
    await db.query('SELECT 1');
    res.json({ success: true, application: 'TunaFresh API', status: 'online', database: 'connected', timestamp: new Date().toISOString() });
  } catch (e) {
    next(e);
  }
}

async function list(req, res, next) {
  try {
    const data = await model.getAll();
    res.json({ success: true, total: data.length, data });
  } catch (e) {
    next(e);
  }
}

async function detail(req, res, next) {
  try {
    const data = await model.getById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const error = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await model.create(req.body);
    res.status(201).json({ success: true, message: 'Produk berhasil ditambahkan.', data });
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const error = validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await model.update(req.params.id, req.body);
    if (!data) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    res.json({ success: true, message: 'Produk berhasil diperbarui.', data });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const data = await model.remove(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Produk tidak ditemukan.' });
    res.json({ success: true, message: 'Produk berhasil dihapus.', data });
  } catch (e) {
    next(e);
  }
}

module.exports = { status, list, detail, create, update, remove };
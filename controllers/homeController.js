const produkModel = require('../models/produkModel');
async function index(req, res, next) {
  try {
    const produk = await produkModel.getAll();
    res.render('index', { title: 'TunaFresh | Manajemen Produk', produk });
  } catch (err) {
    next(err);
  }
}
module.exports = { index };
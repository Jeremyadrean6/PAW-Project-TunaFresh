const router = require('express').Router();
const c = require('../controllers/apiController');

router.get('/status', c.status);
router.get('/produk', c.list);
router.get('/produk/:id', c.detail);
router.post('/produk', c.create);
router.put('/produk/:id', c.update);
router.delete('/produk/:id', c.remove);

module.exports = router;
CREATE TABLE IF NOT EXISTS produk (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(150) NOT NULL,
  kategori VARCHAR(50) NOT NULL CHECK (kategori IN ('Ikan Segar','Produk Olahan')),
  deskripsi TEXT DEFAULT '',
  harga NUMERIC(12,2) NOT NULL CHECK (harga >= 0),
  satuan VARCHAR(50) NOT NULL,
  stok INTEGER NOT NULL DEFAULT 0 CHECK (stok >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produk (nama,kategori,deskripsi,harga,satuan,stok)
SELECT 'Tuna Steak','Ikan Segar','Potongan daging tuna pilihan.',85000,'500 gram',18
WHERE NOT EXISTS (SELECT 1 FROM produk WHERE nama='Tuna Steak');

INSERT INTO produk (nama,kategori,deskripsi,harga,satuan,stok)
SELECT 'Tuna Fillet','Ikan Segar','Daging tuna tanpa tulang.',75000,'500 gram',12
WHERE NOT EXISTS (SELECT 1 FROM produk WHERE nama='Tuna Fillet');

INSERT INTO produk (nama,kategori,deskripsi,harga,satuan,stok)
SELECT 'Tuna Utuh','Ikan Segar','Tuna segar utuh, stok mengikuti hasil tangkapan.',120000,'kg',5
WHERE NOT EXISTS (SELECT 1 FROM produk WHERE nama='Tuna Utuh');

INSERT INTO produk (nama,kategori,deskripsi,harga,satuan,stok)
SELECT 'Abon Tuna','Produk Olahan','Abon tuna gurih siap santap.',35000,'250 gram',20
WHERE NOT EXISTS (SELECT 1 FROM produk WHERE nama='Abon Tuna');

INSERT INTO produk (nama,kategori,deskripsi,harga,satuan,stok)
SELECT 'Bakso Tuna','Produk Olahan','Bakso berbahan dasar ikan tuna.',40000,'500 gram',9
WHERE NOT EXISTS (SELECT 1 FROM produk WHERE nama='Bakso Tuna');
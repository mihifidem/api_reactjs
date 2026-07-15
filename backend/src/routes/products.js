import { Router } from 'express';
import { getDb } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const db = await getDb();
  const rows = await db.all('SELECT * FROM products ORDER BY id');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const db = await getDb();
  const row = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);

  if (!row) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.json(row);
});

router.post('/', async (req, res) => {
  const { name, price, stock = 0 } = req.body;

  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'name y price (number) son obligatorios' });
  }

  const db = await getDb();
  const result = await db.run('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [
    name,
    price,
    stock,
  ]);

  const created = await db.get('SELECT * FROM products WHERE id = ?', [result.lastID]);
  return res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ message: 'name, price y stock son obligatorios' });
  }

  const db = await getDb();
  const result = await db.run('UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?', [
    name,
    price,
    stock,
    req.params.id,
  ]);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  const updated = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const db = await getDb();
  const result = await db.run('DELETE FROM products WHERE id = ?', [req.params.id]);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  return res.status(204).send();
});

export default router;

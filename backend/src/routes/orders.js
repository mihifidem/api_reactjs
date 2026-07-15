import { Router } from 'express';
import { getDb } from '../db.js';

const router = Router();

const selectWithRelations = `
  SELECT
    o.id,
    o.user_id,
    u.name AS user_name,
    o.product_id,
    p.name AS product_name,
    o.quantity,
    o.status,
    o.created_at
  FROM orders o
  JOIN users u ON u.id = o.user_id
  JOIN products p ON p.id = o.product_id
`;

router.get('/', async (_req, res) => {
  const db = await getDb();
  const rows = await db.all(`${selectWithRelations} ORDER BY o.id`);
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const db = await getDb();
  const row = await db.get(`${selectWithRelations} WHERE o.id = ?`, [req.params.id]);

  if (!row) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }

  return res.json(row);
});

router.post('/', async (req, res) => {
  const { user_id, product_id, quantity, status = 'pending' } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ message: 'user_id, product_id y quantity son obligatorios' });
  }

  const db = await getDb();

  try {
    const result = await db.run(
      'INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)',
      [user_id, product_id, quantity, status]
    );

    const created = await db.get(`${selectWithRelations} WHERE o.id = ?`, [result.lastID]);
    return res.status(201).json(created);
  } catch (_error) {
    return res.status(400).json({ message: 'No se pudo crear el pedido. Verifica user_id y product_id' });
  }
});

router.put('/:id', async (req, res) => {
  const { user_id, product_id, quantity, status } = req.body;

  if (!user_id || !product_id || !quantity || !status) {
    return res
      .status(400)
      .json({ message: 'user_id, product_id, quantity y status son obligatorios' });
  }

  const db = await getDb();

  try {
    const result = await db.run(
      'UPDATE orders SET user_id = ?, product_id = ?, quantity = ?, status = ? WHERE id = ?',
      [user_id, product_id, quantity, status, req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    const updated = await db.get(`${selectWithRelations} WHERE o.id = ?`, [req.params.id]);
    return res.json(updated);
  } catch (_error) {
    return res
      .status(400)
      .json({ message: 'No se pudo actualizar el pedido. Verifica user_id y product_id' });
  }
});

router.delete('/:id', async (req, res) => {
  const db = await getDb();
  const result = await db.run('DELETE FROM orders WHERE id = ?', [req.params.id]);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Pedido no encontrado' });
  }

  return res.status(204).send();
});

export default router;

import { Router } from 'express';
import { getDb } from '../db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const db = await getDb();
  const rows = await db.all('SELECT * FROM users ORDER BY id');
  res.json(rows);
});

router.get('/:id', async (req, res) => {
  const db = await getDb();
  const row = await db.get('SELECT * FROM users WHERE id = ?', [req.params.id]);

  if (!row) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.json(row);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name y email son obligatorios' });
  }

  const db = await getDb();

  try {
    const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    const created = await db.get('SELECT * FROM users WHERE id = ?', [result.lastID]);
    return res.status(201).json(created);
  } catch (error) {
    if (String(error.message).includes('UNIQUE')) {
      return res.status(409).json({ message: 'El email ya existe' });
    }

    return res.status(500).json({ message: 'Error creando usuario' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'name y email son obligatorios' });
  }

  const db = await getDb();

  try {
    const result = await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      req.params.id,
    ]);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const updated = await db.get('SELECT * FROM users WHERE id = ?', [req.params.id]);
    return res.json(updated);
  } catch (error) {
    if (String(error.message).includes('UNIQUE')) {
      return res.status(409).json({ message: 'El email ya existe' });
    }

    return res.status(500).json({ message: 'Error actualizando usuario' });
  }
});

router.delete('/:id', async (req, res) => {
  const db = await getDb();
  const result = await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);

  if (result.changes === 0) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.status(204).send();
});

export default router;

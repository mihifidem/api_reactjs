import { getDb } from './db.js';

export async function initializeDatabase() {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK (price >= 0),
      stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
  `);

  const usersCount = await db.get('SELECT COUNT(*) AS count FROM users');
  if (usersCount.count === 0) {
    await db.run(
      `INSERT INTO users (name, email) VALUES
       ('Ana Perez', 'ana@example.com'),
       ('Luis Gomez', 'luis@example.com'),
       ('Marta Diaz', 'marta@example.com')`
    );
  }

  const productsCount = await db.get('SELECT COUNT(*) AS count FROM products');
  if (productsCount.count === 0) {
    await db.run(
      `INSERT INTO products (name, price, stock) VALUES
       ('Teclado Mecanico', 65.5, 20),
       ('Mouse Inalambrico', 25.99, 35),
       ('Monitor 24', 189.0, 12)`
    );
  }

  const ordersCount = await db.get('SELECT COUNT(*) AS count FROM orders');
  if (ordersCount.count === 0) {
    await db.run(
      `INSERT INTO orders (user_id, product_id, quantity, status) VALUES
       (1, 1, 1, 'pending'),
       (2, 2, 2, 'completed'),
       (3, 3, 1, 'pending')`
    );
  }
}

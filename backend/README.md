# Backend API REST (SQLite)

Este backend incluye:

- 3 tablas: `users`, `products`, `orders`
- Persistencia en SQLite (`backend/data/app.db`)
- Datos iniciales al primer arranque
- CRUD completo para las 3 entidades

## Instalacion

```bash
cd backend
npm install
```

## Ejecucion

```bash
npm run dev
```

Servidor por defecto: `http://localhost:4000`

## Endpoints

- `GET /api/health`
- `GET|POST /api/users`
- `GET|PUT|DELETE /api/users/:id`
- `GET|POST /api/products`
- `GET|PUT|DELETE /api/products/:id`
- `GET|POST /api/orders`
- `GET|PUT|DELETE /api/orders/:id`

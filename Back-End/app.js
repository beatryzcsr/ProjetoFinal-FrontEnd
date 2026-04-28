
// Carregar variáveis de ambiente ANTES de tudo
require('dotenv').config();

require('dotenv').config();
const express  = require('express');
const cors     = require('cors');

const produtoRoutes = require('./src/routes/produtoRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// ── Rotas ────────────────────────────────────────────────────
app.use('/produtos', produtoRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API back-v2', versao: '2.0', storage: 'PostgreSQL' });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Banco: ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);
});
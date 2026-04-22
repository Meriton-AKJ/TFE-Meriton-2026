const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test pour vérifier la connexion BDD
app.get('/test-db', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    res.json({ message: "Connexion MySQL réussie !", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
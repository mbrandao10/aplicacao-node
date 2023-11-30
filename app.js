const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/minhaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(produtoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
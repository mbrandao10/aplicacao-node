const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    descricao: String
});

module.exports = mongoose.model('Produto', produtoSchema);
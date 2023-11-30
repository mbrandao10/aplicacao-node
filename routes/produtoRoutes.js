const express = require('express');
const router = express.Router();
const Produto = require('../models/produto');

// POST: Criar um novo produto
router.post('/produtos', async (req, res) => {
    try {
      let produto = new Produto(req.body);
      produto = await produto.save();
      res.status(201).send(produto);
    } catch (error) {
      res.status(400).send(error);
    }
});

// DELETE: Deletar um produto pelo ID
router.delete('/produtos/:id', async (req, res) => {
    try {
      const produto = await Produto.findByIdAndDelete(req.params.id);
      if (!produto) return res.status(404).send();
      res.send(produto);
    } catch (error) {
      res.status(500).send(error);
    }
});

// GET: Listar todos os produtos
router.get('/produtos', async (req, res) => {
    try {
      const produtos = await Produto.find();
      res.send(produtos);
    } catch (error) {
      res.status(500).send(error);
    }
});

// GET: Buscar um produto pelo ID
router.get('/produtos/:id', async (req, res) => {
    try {
      const produto = await Produto.findById(req.params.id);
      if (!produto) return res.status(404).send();
      res.send(produto);
    } catch (error) {
      res.status(500).send(error);
    }
});

// PUT: Atualizar um produto pelo ID
router.put('/produtos/:id', async (req, res) => {
    try {
      const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!produto) return res.status(404).send();
      res.send(produto);
    } catch (error) {
      res.status(400).send(error);
    }
});

module.exports = router;
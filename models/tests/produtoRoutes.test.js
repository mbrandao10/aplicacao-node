const express = require('express');
const request = require('supertest');
const Produto = require('../models/produto');

// Mock do modelo Produto
jest.mock('../models/produto', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: jest.fn().mockResolvedValue({
        _id: "123",
        nome: "Produto Teste",
        preco: 100,
        descricao: "Descrição do Produto Teste"
      })
    };
  });
});

// Configuração do Express e rota para o teste
const app = express();
app.use(express.json());
const router = express.Router();

// POST: Criar um novo produto
router.post('/produtos', async (req, res) => {
  try {
    let produto = new Produto(req.body);
    produto = await produto.save();
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.use(router);

describe('Teste da rota POST /produtos', () => {
  it('deve criar um novo produto e retornar status 201', async () => {
    const produtoMock = {
      nome: "Produto Teste",
      preco: 100,
      descricao: "Descrição do Produto Teste"
    };

    const response = await request(app)
      .post('/produtos')
      .send(produtoMock);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(produtoMock));
  });

});
router.delete('/produtos/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({menssagem: "produto nao encontrado"});
    res.json({ produto, menssagem: "produto deletado com sucesso" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use(router);

describe('Teste da rota DELETE /produtos/:id', () => {
  it('deve deletar um produto existente e retornar status 200', async () => {
    const response = await request(app)
      .delete('/produtos/123');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('menssagem', 'produto deletado com sucesso');
  });

  it('deve retornar status 404 para um produto não encontrado', async () => {
    const response = await request(app)
      .delete('/produtos/123');

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('menssagem', 'produto nao encontrado');
  });
});


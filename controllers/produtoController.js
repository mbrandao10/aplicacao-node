const {Produto: ProdutoMoldel} = require("../models/produto");

const produtoController = {

    create: async(req, res) =>{
        try {
            const produto = {
                nome: req.body.name,
                preco: req.body.preco,
                descricao: req.body.descricao,
            }
            const response = await ProdutoMoldel.create(produto);
            res.status(201).json({response, menssagem: "produto criado com sucesso"});
          } catch (error) {
            res.status(400).send(error);
          }
    }

};

module.exports = produtoController;
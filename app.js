const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// const produtoRoutes = require('./routes/produtoRoutes'); 

app.use(cors());

app.use(express.json());


app.use(bodyParser.json());
// app.use(produtoRoutes);

// Rotas
const routes = require("./routes/router");
app.use("/api", routes);

//DB conexao
const conn = require("./db/conn");

conn();


app.listen(3000, function () {
  console.log("Servidor funcionando!!");
});

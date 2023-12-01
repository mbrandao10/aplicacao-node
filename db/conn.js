const mongoose = require('mongoose');

async function main () {
    try {
        await mongoose.connect("mongodb+srv://matheus:MRUDiQxPUbAHc54b@cluster0.pij7htc.mongodb.net/?retryWrites=true&w=majority");
        console.log("conectado ao bancooooo!!")
    }
    catch (error) {
        console.log (`Errooooooo: ${error}`)
    }
}

module.exports = main
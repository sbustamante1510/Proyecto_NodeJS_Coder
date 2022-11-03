const express = require('express')
const fs = require('fs')

const servidor = express()

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

class Contenedor{

    async getAll(){
        try{
            const resultado = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'));
            console.log(resultado);
            return resultado;
        }catch(error){
            console.log(error)
        }
    }


    async getById(idNumber){
        
        // let productos = [];
        let productoEncontrado;

        try{
            const resultado = JSON.parse(await fs.promises.readFile('./productos.txt','utf-8'));
            console.log("Buscando producto")

            resultado.map(e => {
                if(e.id == idNumber){
                    productoEncontrado = e;
                    console.log(productoEncontrado)
                }
            })
            return productoEncontrado;

        }catch(error){
            console.log(error)
        }
    }

}

const c1 = new Contenedor();


servidor.get('/productos',async(req,res) => {
    res.json(await c1.getAll())
})

servidor.get('/productosRandom',async(req,res) => {

    let numRandom = getRandomArbitrary(1,4);
    res.json(await c1.getById(numRandom))
})

const server = servidor.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

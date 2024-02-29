const fs = require('fs').promises;

class pokemon{
    constructor(Nome, Tipo, Peso, Altura, id, spr) {
        this.Nome = Nome;
        this.Tipo = Tipo;
        this.Peso = Peso;
        this.Altura = Altura;
        this.id = id;
        this.spr = spr;
    }
}

var listaPokemons = []

var urls = []

async function cunamata(){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    const data = await response.json()
    return data.results
}

async function mecanicoMudo(){
    const res = await cunamata()
    res.map((e) =>{
        urls.push(e.url)
    })
    const promises = urls.map(async (url) =>{
        return await (await fetch(url)).json()
    })
    const jsons = await Promise.all(promises)
    jsons.map((e) => {
        listaPokemons.push(new pokemon(e.name, e.types, e.weight ,e.height, e.id, e.sprites['front_default']))
    })

    fs.writeFile('pokemon', JSON.stringify(listaPokemons))
}



mecanicoMudo()
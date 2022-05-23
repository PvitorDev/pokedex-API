const baseUrl = `https://pokeapi.co/api/v2/pokemon/`
const specieUrl = `https://pokeapi.co/api/v2/pokemon-species/`
const searchInput = getElement('.search-input'),
  searchButton = getElement(".search-button"),
  picture = getElement(".pic"),
  stats = getElement("#stats"),
  enterBtn = getElement("#barbutton3"),
  downCross = getElement("#botcross"),
  upCross = getElement("#topcross"),
  buttonShiny = getElement(".buttonbottomPicture"),
  evolve1 = getElement("#yellowBox1"),
  evolve2 = getElement("#yellowBox2")


const position = {
  front: true,
  back: false,
  shiny: false,
}
const evolution = {
  evo: 'true',
  evo2: 'false',
  evo3: 'alse',
}

let pokemon;
let idPoke;
let btnLight = document.querySelectorAll(".btnLight")


//Call api
async function pokemonSearch(url, name) {
  await fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
      description(idPoke)
        .then(text => {
          const descricao = text
          ViewPokemon(descricao)
          readText.splice(0, 2)
          readText.push(pokemon.name, descricao) //Ler pausadamente

        })

    })
    .then(evo => {

    })
    .catch(err => searchError())
}


//Pokemon Descrição

async function description(id) {
  try {
    const num = Math.floor(Math.random() * (5 - 1)) + 1;
    const response = await fetch(specieUrl + id)
    const person = await response.json()
    const textInfo = person.flavor_text_entries.filter(e => e.language.name === 'en')[num].flavor_text
    return textInfo
  } catch (error) {
    searchError(error)
  }
}
//Pokemon evolução
async function envolveTo(id) {
  try {
    const response = await fetch(specieUrl + id)
    const person = await response.json()
    const evolveArr = []
    let evo1;
    let evo2;
    let evo3;
    const evo = person.evolution_chain.url
    const nameEvo = person.name
    if (nameEvo) {
      const res = await fetch(evo) //response
      const per = await res.json() //person
      const varPer = per.chain
      if (varPer) {
        const capture = await fetch(`${baseUrl}${varPer.species.name}`)
        evo1 = varPer.evolves_to[0]
        evolveArr.push(capture)
      }
      if (evo1) {
        const capture1 = await fetch(`${baseUrl}${evo1.species.name}`)
        evolveArr.push(capture1)
        evo1.species.name
        evo2 = evo1.evolves_to[0]
      }
      if (evo2) {
        const capture2 = await fetch(`${baseUrl}${evo2.species.name}`)

        evolveArr.push(capture2)
      }
    }
    Promise.all(evolveArr)
      .then(responses => Promise.all(responses.map(data => data.json())))
      .then(data => {
        const capturePoke = evo1.species.name
        const spritesEvo = data.map(s => s.sprites.front_default);
        const namesEvo = data.map(p => p.name)
        if (pokemon.name == namesEvo[0]) {

          if (spritesEvo[1] === undefined) {
            evolve1.innerHTML = ''
            evolve2.innerHTML = ''
          } else if (spritesEvo[2] === undefined && spritesEvo[1]) {
            evolve1.innerHTML = evolvePic(spritesEvo[1], namesEvo[1])
            evolve2.innerHTML = ''
          } else {
            evolve1.innerHTML = evolvePic(spritesEvo[1], namesEvo[1])
            evolve2.innerHTML = evolvePic(spritesEvo[2], namesEvo[2])
          }
        } else if (pokemon.name === namesEvo[1]) {
          if (spritesEvo[1] === undefined) {
            evolve1.innerHTML = ''
            evolve2.innerHTML = ''
          } else if (spritesEvo[2]) {
            evolve1.innerHTML = evolvePic(spritesEvo[2], namesEvo[2])
            evolve2.innerHTML = ''
          } else if (spritesEvo[2] === undefined) {
            evolve1.innerHTML = evolvePic(spritesEvo[0], namesEvo[0])
            evolve2.innerHTML = ''
          }

        } else if (pokemon.name === namesEvo[2]) {
          evolve1.innerHTML = evolvePic(spritesEvo[0], namesEvo[0])
          evolve2.innerHTML = evolvePic(spritesEvo[1], namesEvo[1])
        }
        return data
      }).then(mapear => {
        const iEvo = evolve1.innerHTML
        const iEvo2 = evolve2.innerHTML
        const clicada = mapear.map(p => p.name)
        /* clicada.push(mapear.map(p => p.name)) */
        const pokes = {
          poke1: clicada[0],
          poke2: clicada[1],
          poke3: clicada[2]
        }
        if (pokemon.name == pokes.poke1) {
          evolution.evo = pokes.poke1
          if (pokes.poke2 !== undefined) {
            evolution.evo2 = pokes.poke2
          }
          if (pokes.poke3 !== undefined) {
            evolution.evo3 = pokes.poke3
          }
          if (pokes.poke3 == undefined) {
            evolution.evo3 = false
          }
        } else if (pokemon.name == pokes.poke2) {
          evolution.evo = pokes.poke1
          evolution.evo2 = pokes.poke2
          if (pokes.poke3 !== undefined) {
            evolution.evo3 = pokes.poke3
          }
          if (pokes.poke3 == undefined) {
            evolution.evo3 = false
          }
        } else if (pokemon.name == pokes.poke3) {
          evolution.evo = pokes.poke1
          evolution.evo2 = pokes.poke2
          evolution.evo3 = pokes.poke3

        }
       

      })

  } catch (error) {
    searchError(error)
  }
}

//Catch ERRO
function searchError() {
  btnLight.forEach(btn => {
    btn.classList.add("blink")
    evolve1.innerHTML = ''
    evolve2.innerHTML = ''
    picture.innerHTML = ''
    stats.innerHTML = 'LOADING ...'
    setTimeout(() => {
      btn.classList.remove("blink")
    }, 2300)
  })
  setTimeout(() => {
    erroL.play()
    evolve1.innerHTML = ''
    evolve2.innerHTML = ''
    searchInput.value = ''
    picture.innerHTML = ''
    stats.innerHTML = 'NotFound'

  }, 2400)
}

//Pokemon na tela
function ViewPokemon(descricao) {
  blinkTime()

  setTimeout(() => {
    botaozinho.play()
    envolveTo(idPoke)
    searchInput.value = pokemon.id
    picture.innerHTML = makePic()
    stats.innerHTML = makeInfo(descricao)
  }, 1000)

}


//Search Button - preventDefault - function search() linha 7 
searchButton.addEventListener('click', evt => {
  evt.preventDefault()
  search()
})

//Seta pra Baixo ( Mudar Pokemon ordem crescente)
downCross.addEventListener('click', evt => {
  idPoke = searchInput.value.toLowerCase()

  if (idPoke == '' || picture.innerHTML == '') {
    idPoke = 1
  } else {
    idPoke = Math.min(pokemon.id + 1)
  }
  pokemonSearch(baseUrl, idPoke)
})

//Seta pra cima (Mudar Pokemon ordem decrescente)
upCross.addEventListener('click', evt => {
  idPoke = searchInput.value.toLowerCase()
  if (idPoke == '' || picture.innerHTML == '' || idPoke == 1) {
    idPoke = 1
  } else {
    idPoke = Math.min(pokemon.id - 1)
  }
  pokemonSearch(baseUrl, idPoke)
})



function onclickEvo1() {
  if (pokemon.name == evolution.evo) {
    return pokemonSearch(baseUrl, evolution.evo2)
  } else if (pokemon.name == evolution.evo2 && evolution.evo3 !== false) {
    return pokemonSearch(baseUrl, evolution.evo3)
  } else if (pokemon.name == evolution.evo2 && evolution.evo3 == false) {
    return pokemonSearch(baseUrl, evolution.evo)
  } else if (pokemon.name == evolution.evo3) {
    return pokemonSearch(baseUrl, evolution.evo)
  }
}

function onclickEvo2() {
  if (pokemon.name == evolution.evo) {
    return pokemonSearch(baseUrl, evolution.evo3)
  } else if (pokemon.name == evolution.evo2) {
    return false
  } else if (pokemon.name == evolution.evo3) {
    return pokemonSearch(baseUrl, evolution.evo2)
  }
}
let bigButton = getElement("#buttonGlass"),
  miniButton1 = getElement("#miniButtonGlass1"),
  miniButton2 = getElement("#miniButtonGlass2"),
  miniButton3 = getElement("#miniButtonGlass3")
  btnSound = getElement(".fa-volume-high")
//Configuração do SPEAKS
const speaks = [{
  "name": "Pokedex",
  "lang": "en-US"
}]
const readText = [] //String de leitura 

//Procurar Pokemon btn Enter
function search(e) {
  idPoke = searchInput.value.toLowerCase()
  pokemonSearch(baseUrl, idPoke)

}

//Adicionar Numero na tela
function clickN(e) {
  searchInput.value += e
}
//Apagar input da tela
function deleteN() {
  searchInput.value = ''
}

//Get element
function getElement(element) {
  return document.querySelector(element)
}

//Mostrar Informações no stats
function makeInfo(descricao) {
  let pokeinfo =
    `<strong>Name:</strong> ${pokemon.name.charAt(0).toUpperCase()+pokemon.name.substr(1)}.<br/>
    <strong>ID:</strong> Nº ${pokemon.id}. <br/>
    <strong>Type:</strong> ${pokemon.types.map(item => ' ' + item.type.name).toString()}.<br/>
    <strong>Height:</strong> ${pokemon.height  / 10} m.<br/>
    <strong>Weight:</strong> ${pokemon.weight  / 10} kg.<br/>
    <strong>Skills:</strong> ${pokemon.moves[0].move.name.toString()}, ${pokemon.moves[1].move.name.toString()}, 
    ${pokemon.moves[2].move.name.toString()},  ${pokemon.moves[3].move.name.toString()} and etc.
    <br/>
    <strong>Base Exp:</strong> ${pokemon.base_experience}<br/>
    <strong>Description:</strong> ${descricao}<br/>
    `
  return pokeinfo
}

//Mudar posição
const togglePosition = function () {
  idPoke = searchInput.value.toLowerCase()
  if (idPoke == '') {
    idPoke = 1
  }
  if (position.front == true) {
    position.front = false
    position.back = true

  } else {
    position.front = true
    position.back = false

  }
  pokemonSearch(baseUrl, idPoke)
}

//Mudar cor do pokemon
const toggleShiny = function () {
  idPoke = searchInput.value.toLowerCase()
  if (idPoke == '') {
    idPoke = 1
  }
  if (position.shiny == false) {
    position.shiny = true
    buttonShiny.classList.remove("buttonbottomPicture")
    buttonShiny.classList.add("colorS")
  } else {
    position.shiny = false
    buttonShiny.classList.remove("colorS")
    buttonShiny.classList.add("buttonbottomPicture")

  }
  pokemonSearch(baseUrl, idPoke)

}

// Retornar Imagem
function makePic() {
  let img;
  if (position.front === true && position.shiny === false ) {
    img = `
  <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}" height= '190'>
  `
  } else if (position.back === true && position.shiny === false) {
    img = `
  <img src="${pokemon.sprites.back_default}" alt="Sprite of ${pokemon.name}" height= '190'>
  `
  } else if (position.back === true && position.shiny === true ) {
    img = `
  <img src="${pokemon.sprites.back_shiny}" alt="Sprite of ${pokemon.name}" height= '190'>
  `
  } else if (position.front === true && position.shiny === true ) {
    img = `
  <img src="${pokemon.sprites.front_shiny}" alt="Sprite of ${pokemon.name}" height= '190'>
  `
  }
  return img

}

//Botões piscando 
function blinkTime() {
  bigButton.classList.add("blink2")
  setTimeout(() => {
    miniButton1.classList.add("blink2")
  }, 100)
  setTimeout(() => {
    miniButton2.classList.add("blink2")
  }, 200)
  setTimeout(() => {
    miniButton3.classList.add("blink2")
  }, 300)
  setTimeout(() => {
    bigButton.classList.remove("blink2")
    miniButton1.classList.remove("blink2")
    miniButton2.classList.remove("blink2")
    miniButton3.classList.remove("blink2")
  }, 1500)
}

//Retornar som ao clicar no botão azul
function sound() {
  const readName = new SpeechSynthesisUtterance(readText[0])
  const readDesc = new SpeechSynthesisUtterance(readText[1])
  const readTime = new SpeechSynthesisUtterance('.') //Para ter uma pausa na leitura
  const voice = speaks[0]
  voice.voiceURI = voice.name
  readName.rate = 1
  readName.lang = voice.lang
  readName.pitch = 1
  readDesc.rate = 1
  readDesc.lang = voice.lang
  readDesc.pitch = 1
  readTime.volume = 0
  speechSynthesis.speak(readTime)
  speechSynthesis.speak(readName)
  speechSynthesis.speak(readDesc)
  btnSound.classList.add("soundOpacity")
  setTimeout(()=>{
    btnSound.classList.remove("soundOpacity")
  },8500)
}

//Retornar imagem dos evoluídos 

function evolvePic(evoP) {
  let evolveImg1 = `<img src="${evoP}" alt="Sprite of " height= '110' style= margin-left:15px;>`
  return evolveImg1
}
console.log(`
                                        
PPPPPPPPPPPPPPPPP                            
P::::::::::::::::P                           
P::::::PPPPPP:::::P                          
PP:::::P     P:::::P                         
  P::::P     P:::::Pvvvvvvv           vvvvvvv
  P::::P     P:::::P v:::::v         v:::::v 
  P::::PPPPPP:::::P   v:::::v       v:::::v  
  P:::::::::::::PP     v:::::v     v:::::v   
  P::::PPPPPPPPP        v:::::v   v:::::v    
  P::::P                 v:::::v v:::::v     
  P::::P                  v:::::v:::::v      
  P::::P                   v:::::::::v       
PP::::::PP                  v:::::::v        
P::::::::P                   v:::::v         
P::::::::P                    v:::v          
PPPPPPPPPP                     vvv           

`)

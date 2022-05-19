const botaozinho = new Audio('./sounds/botão.mp3')
const erroL = new Audio('./sounds/erro.mp3')
const soundInit = new Audio('./sounds/pokedex.mp3')
const soundtrack = new Audio('./sounds/soundtrack.mp3')
const btn = getElement(".fa-play")
const music = {
    play: false,
    pause: true
}
function initSound(){ //Função criada para iniciar som sem erro do navegador
    if(music.play === false){
        music.play = true
        music.pause = false
        setTimeout(()=>{

            soundInit.play()
            soundInit.volume = 0.2
        },500)
        setTimeout(()=>{
    
            soundtrack.play()
            soundtrack.volume = 0.2
            soundtrack.loop = true
        },2700)
    }else if(music.play===true || music.pause === false){
        music.play = false
        music.pause = true
        soundtrack.pause()
    }
    music.pause === false ? btn.classList.add("cor"):btn.classList.remove("cor")

}

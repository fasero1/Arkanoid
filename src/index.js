import Game from './Game'

const runGame = () => {
  window.removeEventListener('load', runGame)

  Game.init()

  // window.Game = Game
}

window.addEventListener('load', runGame)

import '../styles/app.scss';

import GameFactory from './GameFactory';

const game = GameFactory.singleplayer();
game.gameLoop();

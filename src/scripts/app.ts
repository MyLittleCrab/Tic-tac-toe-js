import '../styles/app.scss';

import GameFactory from './GameFactory';

// const mainTable: HTMLElement | null = document.querySelector('.main-table');

// if (mainTable) {
const game = GameFactory.singleplayer();
game.gameLoop();
// }

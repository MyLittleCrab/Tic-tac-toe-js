import Game from './Game';
import ComputerPlayer from './ComputerPlayer';
import Player from './Player';
import Renderer from './Renderer';
import UserInterface from './UserInterface';

export default class GameFactory {
  public static singleplayer(): Game {
    const ui = new UserInterface();
    const playerX = new Player(ui);
    const playerO = new ComputerPlayer();
    const renderer = new Renderer(ui);
    return new Game(playerX, playerO, renderer);
  }

  public static multiplayerOnePC(): Game {
    const ui = new UserInterface();
    const playerX = new Player(ui);
    const playerO = new Player(ui);
    const renderer = new Renderer(ui);
    return new Game(playerX, playerO, renderer);
  }

  public static multiplayerInternet(): Game {
    throw new Error('not implemented');
  }
}

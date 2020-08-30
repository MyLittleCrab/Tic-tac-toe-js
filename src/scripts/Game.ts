import IPlayer from './IPlayer';
import Renderer from './Renderer';
import GameState from './GameState';
import { XOValue } from './types';

export default class Game {
  private state: GameState;
  private players: Map<XOValue, IPlayer> = new Map();
  private currentTurn: XOValue = XOValue.X;

  constructor(player1: IPlayer, player2: IPlayer, private renderer: Renderer) {
    this.state = new GameState();

    this.players.set(XOValue.X, player1);
    this.players.set(XOValue.O, player2);

    for (const [symbol, player] of this.players) {
      player.setSymbol(symbol);
      player.watchForState(this.state.readonly());
    }
  }

  private nextTurn(): void {
    this.currentTurn = this.currentTurn === XOValue.O ? XOValue.X : XOValue.O;
  }

  public async gameLoop(): Promise<void> {
    await this.renderer.watchForState(this.state.readonly());

    while (!this.state.isGameOver()) {
      const playerMove = await this.players.get(this.currentTurn)!.makeMove();
      this.state.setPlayerMove(playerMove, this.currentTurn);

      this.nextTurn();
    }
  }
}

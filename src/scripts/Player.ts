import IPlayer from './IPlayer';
import IGameStateReadable from './IGameStateReadable';
import { Coords, XOValue } from './types';
import UserInterface from './UserInterface';

export default class Player implements IPlayer {

  constructor(private ui: UserInterface) {}
  setSymbol(symbol: XOValue): void {
    // nothing. User can watch game state by himself
  }

  watchForState(state: IGameStateReadable): void {
    // nothing. User can watch game state by himself
  }

  async makeMove(): Promise<Coords> {
    const clickCoords = await this.ui.onPromise('click');
    return {
      row: clickCoords[0],
      col: clickCoords[1],
    };
  }
}

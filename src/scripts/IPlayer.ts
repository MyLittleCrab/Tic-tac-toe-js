import IGameStateReadable from './IGameStateReadable';
import { Coords, XOValue } from './types';

export default interface IPlayer {
  watchForState(state: IGameStateReadable): void;
  makeMove(): Promise<Coords>;
  setSymbol(symbol: XOValue): void;
}

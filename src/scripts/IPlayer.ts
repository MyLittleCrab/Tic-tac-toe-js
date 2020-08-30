// import { PlaygroundTable, Playground, XOValue } from './Playground';
import IGameStateReadable from './IGameStateReadable';
import { Coords, XOValue } from './types';

export default interface IPlayer {
  // makeMove(playgroundTable: PlaygroundTable, xo: XOValue): Promise<Сoords>;
  watchForState(state: IGameStateReadable): void;
  makeMove(): Promise<Coords>;
  setSymbol(symbol: XOValue): void;
  // playground: Playground | undefined;
}

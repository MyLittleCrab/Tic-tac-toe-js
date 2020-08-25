// import { PlaygroundTable, Playground, XOValue } from './Playground';
import IGameStateReadable from './IGameStateReadable';
import { Coords } from './types';

export default interface IPlayer{
    // makeMove(playgroundTable: PlaygroundTable, xo: XOValue): Promise<Сoords>;
    watchForState(state: IGameStateReadable): void;
    makeMove(): Promise<Coords>;
    // playground: Playground | undefined;
}
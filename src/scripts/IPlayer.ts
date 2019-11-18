import { PlaygroundTable, Сoords, Playground, XOValue } from './Playground';

export default interface IPlayer{
    makeMove(playgroundTable: PlaygroundTable, xo: XOValue): Promise<Сoords>;
    playground: Playground | undefined;
}
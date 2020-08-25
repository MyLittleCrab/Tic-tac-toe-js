import { Playground } from './Playground';
import IPlayer from './IPlayer';
import IGameStateReadable from './IGameStateReadable';
import { Coords } from './types';
import UserInterface from './UserInterface';

export default class Player implements IPlayer{
    public playground: Playground | undefined;

    constructor(private ui: UserInterface){
    }
    watchForState(state: IGameStateReadable): void {
        throw new Error("Method not implemented.");
    }
    makeMove(): Promise<Coords> {
        throw new Error("Method not implemented.");
    }

    // public async makeMove(): Promise<Coords>{
    //     if (this.playground){
    //         this.playground.activate();
    //         const clickCoords = await this.playground.onPromise('click');
    //         return {
    //             col: clickCoords[0],
    //             row: clickCoords[1]
    //         };
    //     } else {
    //         throw new Error('Cannot find playground to play');
    //     }
    // }
}
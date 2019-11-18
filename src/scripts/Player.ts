import { Coords, Playground } from './Playground';
import IPlayer from './IPlayer';

export default class Player implements IPlayer{
    public playground: Playground | undefined;

    constructor(){
    }

    public async makeMove(): Promise<Coords>{
        if (this.playground){
            this.playground.activate();
            const clickCoords = await this.playground.onPromise('click');
            return {
                col: clickCoords[0],
                row: clickCoords[1]
            };
        } else {
            throw new Error('Cannot find playground to play');
        }
    }
}
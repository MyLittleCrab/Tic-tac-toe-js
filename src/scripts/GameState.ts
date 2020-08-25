import IGameStateReadable from './IGameStateReadable';
import Eventable from './Eventable';
import { CellValueCoords, Coords, XOValue, CellValue } from './types';

export default class GameState extends Eventable implements IGameStateReadable {
    private stateArray: Array<Array<CellValue>>  = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

    constructor() {
        super();
        // this.init();
    }

    // private init() {

    // }

    public hasEmptyCells(): Boolean {
        for (const row of this.stateArray){
            for (const col of row){
                if (col === null){
                    return true;
                }
            }
        }
        return false;
    }

    public readonly(): IGameStateReadable {
        return this;
    }

    public setPlayerMove(move: Coords, xo: XOValue): void {
        this.trigger('change', move, xo);
        this.stateArray[move.row][move.col] = xo;
    }


    // 1 -- \
    // 2 -- /
    // private getDiagIndexes(index: number): Array<Coords>{
    //     if (index === 1){
    //         return [
    //             {col: 0, row: 0},
    //             {col: 1, row: 1},
    //             {col: 2, row: 2}
    //         ]
    //     } else {
    //         return [
    //             {col: 2, row: 0},
    //             {col: 1, row: 1},
    //             {col: 0, row: 2}
    //         ]
    //     }
    // }
};

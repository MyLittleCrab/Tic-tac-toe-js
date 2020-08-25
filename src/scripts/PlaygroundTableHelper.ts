import { PlaygroundTable, XOValue, CellValue, Coords } from './Playground';
import Utils from './Utils';

export interface infoObject{
    xPoints: number,
    oPoints: number,
    emptyPoints: number
}



export class PlaygroundTableHelper{
    
    private pgtableExt: Array<Array<CellValueCoords>> = [
        [],
        [],
        []
    ];

    private emptyCells: Array<CellValueCoords> = [];

    public indexes: Readonly<Array<number>> = [0,1,2];
    public diagIndexes: Readonly<Array<number>> = [1,2];

    constructor(playgroundTable: PlaygroundTable){
        for (const row in playgroundTable){
            const rowValue = playgroundTable[row];
            for (const col in rowValue){
                const value = rowValue[col];

                const cellExt = {
                    value,
                    coords: {
                        col: parseInt(col),
                        row: parseInt(row)
                    }
                };

                this.pgtableExt[row][col] = cellExt;

                if (!value){
                    this.emptyCells.push(cellExt);
                }
            }
        }
    }
    
    public getRow(index: number){
        return this.pgtableExt[index];
    }

    public getColumn(index: number){
        return this.pgtableExt.map(row => row[index]);
    }

    // 1 -- \
    // 2 -- /
    public getDiag(index: number){
        const pt = this.pgtableExt;
        const diagIndexes = this.getDiagIndexes(index);
        const retArray = [];

        for (const di of diagIndexes){
            retArray.push(pt[di.row][di.col]);
        }

        return retArray;
    }

    public getAll(){
        let all: Array<CellValueCoords> = [];

        for (let i = 0; i < 3; i++){
            all = all.concat(this.getRow(i));
        }
        return all;
    }
    // 1 -- \
    // 2 -- /
    public getDiagIndexes(index: number): Array<Coords>{
        if (index === 1){
            return [
                {col: 0, row: 0},
                {col: 1, row: 1},
                {col: 2, row: 2}
            ]
        } else {
            return [
                {col: 2, row: 0},
                {col: 1, row: 1},
                {col: 0, row: 2}
            ]
        }
    }

    public getOPoints(): Array<CellValueCoords>{
        const all = this.getAll();
        let oPoints: Array<CellValueCoords> = [];

        for (const point of all){
            if (point.value === XOValue.O){
                oPoints.push(point);
            }
        }
        return oPoints;
    }

    public getXPoints(): Array<CellValueCoords>{
        const all = this.getAll();
        let xPoints: Array<CellValueCoords> = [];

        for (const point of all){
            if (point.value === XOValue.X){
                xPoints.push(point);
            }
        }
        return xPoints;
    }

    public getRowInfo(index: number): infoObject{
        const row = this.getRow(index);
        return this.getInfoArray(row);
    }

    public getColInfo(index: number): infoObject{
        const col = this.getColumn(index);
        return this.getInfoArray(col);
    }

    public getDiagInfo(index: number): infoObject{
        const diag = this.getDiag(index);
        return this.getInfoArray(diag);
    }

    public getAllInfo(): infoObject{
        const all = this.getAll();
        return this.getInfoArray(all);
    }

    private getInfoArray(values: Array<CellValueCoords>): infoObject{
        let xPoints = 0;
        let oPoints = 0;
        let emptyPoints = 0;
        for (const el of values){
            if (!el.value){
                emptyPoints ++;
            } else if (el.value == XOValue.X){
                xPoints ++;
            } else {
                oPoints ++;
            }
        }
        return {
            xPoints,
            oPoints,
            emptyPoints
        }
    }

    public getRandomEmptyCell(): Coords{
        return this.emptyCells[Utils.getRandomInt(0, this.emptyCells.length)].coords;
    }

    public getRandomEmptyCellOnRow(index: number): Coords{
        const emptyRowCells = this.emptyCells.filter( cell => cell.coords.row == index);
        return emptyRowCells[Utils.getRandomInt(0, emptyRowCells.length)].coords;
    }

    public getRandomEmptyCellOnCol(index: number): Coords{
        const emptyColCells = this.emptyCells.filter( cell => cell.coords.col == index);
        return emptyColCells[Utils.getRandomInt(0, emptyColCells.length)].coords;
    }

    public getRandomEmptyCellOnDiag(index: number): Coords{
        const diagCoords = this.getDiagIndexes(index);
        const emptyDiagCells = this.emptyCells.filter( cell => {
            return Utils.arrayIncludes(diagCoords, cell.coords)
        });
        return emptyDiagCells[Utils.getRandomInt(0, emptyDiagCells.length)].coords;
    }

}
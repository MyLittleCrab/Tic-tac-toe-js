import IGameStateReadable from './IGameStateReadable';
import Eventable from './Eventable';
import { Coords, XOValue, CellValue, StateInfo } from './types';

export default class GameState extends Eventable implements IGameStateReadable {
  private stateArray: Array<Array<CellValue>> = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  private gameOverFlag: Boolean = false;
  private winner: XOValue | undefined;

  public indexes: ReadonlyArray<number> = [0, 1, 2];
  public diagIndexes: ReadonlyArray<number> = [1, 2];

  constructor() {
    super();
  }

  getWinner(): XOValue | undefined {
    return this.winner;
  }

  public getEmptyCells(): Array<Coords> {
    const emptyCells: Array<Coords> = [];
    for (const rowIndex of this.indexes) {
      const row = this.stateArray[rowIndex];

      for (const colIndex of this.indexes) {
        const col = row[colIndex];
        if (col == null) {
          emptyCells.push({
            col: colIndex,
            row: rowIndex,
          });
        }
      }
    }
    return emptyCells;
  }

  public isGameOver(): Boolean {
    return this.gameOverFlag;
  }

  public readonly(): IGameStateReadable {
    return this;
  }

  public setPlayerMove(move: Coords, xo: XOValue): void {
    this.trigger('change', move, xo);
    this.setMove(move, xo);
    this.gameOverChecks(move, xo);
  }

  // calculate row/col/diag info in array.prototype.reduce
  private infoReducer(info: StateInfo, xoval: XOValue | null): StateInfo {
    let { X, O, empty } = info;
    switch (xoval) {
      case XOValue.X:
        return { X: X + 1, O, empty };
      case XOValue.O:
        return { X, O: O + 1, empty };
      default:
        return { X, O, empty: empty + 1 };
    }
  }

  public getColInfo(colNumber: number): StateInfo {
    return this.stateArray
      .map(row => row[colNumber])
      .reduce(this.infoReducer, { X: 0, O: 0, empty: 0 });
  }

  public getRowInfo(rowNumber: number): StateInfo {
    return this.stateArray[rowNumber].reduce(this.infoReducer, { X: 0, O: 0, empty: 0 });
  }

  public getDiagInfo(diagNumber: number): StateInfo {
    return this.getDiagCoords(diagNumber)
      .map(coords => this.stateArray[coords.row][coords.col])
      .reduce(this.infoReducer, { X: 0, O: 0, empty: 0 });
  }

  private setMove(move: Coords, xo: XOValue): void {
    if (this.stateArray[move.row][move.col] == null) {
      this.stateArray[move.row][move.col] = xo;
    } else {
      throw new Error('This cell already have symbol');
    }
  }

  private setWinner(xo: XOValue) {
    this.winner = xo;
    this.gameOverFlag = true;
  }

  private gameOverChecks(move: Coords, xoMove: XOValue): void {
    // check symbols count in row
    const rowInfo = this.getRowInfo(move.row);
    if (rowInfo[xoMove] == 3) {
      this.setWinner(xoMove);
    }
    // check symbols count in col
    const colInfo = this.getColInfo(move.col);
    if (colInfo[xoMove] == 3) {
      this.setWinner(xoMove);
    }
    // check symbols count in diag
    for (const diagIndex of this.diagIndexes) {
      const diagInfo = this.getDiagInfo(diagIndex);
      if (diagInfo[xoMove] == 3) {
        this.setWinner(xoMove);
      }
    }

    if(this.getEmptyCells().length == 0){
      this.gameOverFlag = true;
    }
  }
  // 1 -- \
  // 2 -- /
  public getDiagCoords(index: number): Array<Coords> {
    if (index == 1) {
      return [
        { col: 0, row: 0 },
        { col: 1, row: 1 },
        { col: 2, row: 2 },
      ];
    } else {
      return [
        { col: 2, row: 0 },
        { col: 1, row: 1 },
        { col: 0, row: 2 },
      ];
    }
  }
}

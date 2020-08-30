import IPlayer from './IPlayer';
import IGameStateReadable from './IGameStateReadable';
import { Coords, XOValue, StateInfo } from './types';
import Utils from './Utils';

export default class ComputerPlayer implements IPlayer {
  private symbol: XOValue | undefined;
  private enemy: XOValue | undefined;

  private state: IGameStateReadable | null = null;

  constructor() {}

  public setSymbol(symbol: XOValue): void {
    this.symbol = symbol;
    this.enemy = this.symbol == XOValue.O ? XOValue.X : XOValue.O;
  }
  public watchForState(state: IGameStateReadable): void {
    this.state = state;
  }
  private getRandomCell(cells: Array<Coords>): Coords {
    return cells[Utils.getRandomInt(0, cells.length)];
  }

  private tryMove(validator: Function): Coords | null {
    if (!this.state) {
      throw new Error('Cannot calc move without link to game state');
    }
    if (!this.enemy || !this.symbol) {
      throw new Error('Cannot calc move without XO symbol assign');
    }
    const emptyCells = this.state.getEmptyCells();

    for (const rowIndex of this.state.indexes) {
      const info = this.state.getRowInfo(rowIndex);
      if (validator(info)) {
        return this.getRandomCell(emptyCells.filter(coord => coord.row == rowIndex));
      }
    }

    for (const colIndex of this.state.indexes) {
      const info = this.state.getColInfo(colIndex);
      if (validator(info)) {
        return this.getRandomCell(emptyCells.filter(coord => coord.col == colIndex));
      }
    }

    for (const diagIndex of this.state.diagIndexes) {
      const info = this.state.getDiagInfo(diagIndex);
      const diagCoords = this.state.getDiagCoords(diagIndex);
      if (validator(info)) {
        return this.getRandomCell(
          emptyCells.filter(coord => Utils.arrayIncludesCoord(diagCoords, coord))
        );
      }
    }
    return null;
  }

  private tryLastMoveToWin(): Coords | null {
    // if enemy not have symbols on this row/col/diag and row/col/diag has last empty cell
    return this.tryMove((info: StateInfo) => info[this.enemy!] == 0 && info.empty == 1);
  }

  private tryDefence(): Coords | null {
    // if enemy has 2 symbols on this row/col/diag and row/col/diag has last empty cell
    return this.tryMove((info: StateInfo) => info[this.enemy!] == 2 && info.empty == 1);
  }

  private tryAttack(): Coords | null {
    const emptyCells = this.state!.getEmptyCells();
    // fill center if can
    const center: Coords = { col: 1, row: 1 };
    if (
      this.state!.getEmptyCells().filter(
        coord => center.row == coord.row && center.col == coord.col
      )
    ) {
      return center;
    }

    // if this player has no symbols -- fill random cell
    const playersMoves = this.state!.indexes.map(rowIndex =>
      this.state!.getRowInfo(rowIndex)
    ).reduce((count, info) => count + info[this.symbol!], 0);

    if (playersMoves == 0) {
      return this.getRandomCell(emptyCells);
    }

    // if this player has one symbol on the playground: look at the context
    if (playersMoves == 1) {
      return this.tryMove(
        (info: StateInfo) => info[this.symbol!] == 1 && info[this.enemy!] == 0 && info.empty > 0
      );
    }
    return null;
  }

  public async makeMove(): Promise<Coords> {
    if (!this.state) {
      throw new Error('Cannot calc move without link to game state');
    }

    let moveCoords: Coords | null = null;

    // If the player has one move left to win: attack and win
    moveCoords = this.tryLastMoveToWin();
    if (moveCoords) {
      return moveCoords;
    }

    // If need defence: defend
    moveCoords = this.tryDefence();
    if (moveCoords) {
      return moveCoords;
    }

    // If we don't see anything interesting: attack
    moveCoords = this.tryAttack();
    if (moveCoords) {
      return moveCoords;
    }

    return this.getRandomCell(this.state.getEmptyCells());
  }
}

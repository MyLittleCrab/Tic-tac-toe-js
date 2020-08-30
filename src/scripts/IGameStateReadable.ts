import IEventable from './IEventable';
import { XOValue, StateInfo, Coords } from './types';

export default interface IGameStateReadable extends IEventable {
  getWinner(): XOValue | undefined;
  isGameOver(): Boolean;
  getColInfo(colNumber: number): StateInfo;
  getRowInfo(rowNumber: number): StateInfo;
  getDiagInfo(diagNumber: number): StateInfo;
  getEmptyCells(): Array<Coords>;
  getDiagCoords(index: number): Array<Coords>;
  indexes: ReadonlyArray<number>;
  diagIndexes: ReadonlyArray<number>;
}

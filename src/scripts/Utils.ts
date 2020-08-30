import { Coords } from './types';

export default class Utils {
  public static arrayIncludesCoord(array: Array<Coords>, coord: Coords): Boolean {
    for (const el of array) {
      if (this.coordsEqual(el, coord)) {
        return true;
      }
    }
    return false;
  }

  public static coordsEqual(coord1: Coords, coord2: Coords): Boolean {
    if (coord1.col == coord2.col && coord1.row == coord2.row) {
      return true;
    }
    return false;
  }

  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

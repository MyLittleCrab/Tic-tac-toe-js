export enum XOValue {
  X = 'X',
  O = 'O',
}

export type StateInfo = {
  X: number;
  O: number;
  empty: number;
};

export type Coords = {
  col: number;
  row: number;
};

export type CellValue = XOValue | null;

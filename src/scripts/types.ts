export enum XOValue{
    X = 'X',
    O = 'O'
}

export type Coords = {
    col: number,
    row: number
}

export type CellValue = XOValue | null;

export type CellValueCoords = {
    value: CellValue,
    coords: Coords
}
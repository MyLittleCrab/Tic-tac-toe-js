import Eventable from './Eventable';
import IPlayer from './IPlayer';
import { PlaygroundTableHelper } from './PlaygroundTableHelper';

export enum XOValue{
    X = 'X',
    O = 'O'
}

export type Coords = {
    col: number,
    row: number
}

export type PlaygroundTable = Array<Array<CellValue>>;

export type CellValue = XOValue | null;

export class Playground extends Eventable{
    private values: PlaygroundTable = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    private _turn: XOValue;

    private set turn(turn: XOValue){
        this._turn = turn;
        this.trigger('turn', turn);
    }

    private get turn(){
        return this._turn;
    }

    private newTurn(){
        this.turn = this.turn == XOValue.X ? XOValue.O : XOValue.X;
    }

    private getCurrentPlayer(): IPlayer{
        return this.turn == XOValue.X ? this.playerX : this.playerO;
    }

    constructor(private tableForRender: HTMLElement, 
        private playerX: IPlayer, private playerO: IPlayer){
        
        super();
        this._turn = XOValue.X;

        playerO.playground = this;
        playerX.playground = this;

        this.render();
        this.trigger('init');
        this.game();
    }

    private async game(){
        let gameRunning = true;
        const playgroundTableIndexes = [0,1,2];
        while(gameRunning){
            // 1. Спросить у очередного игрока, какой у него ход, отдав сетап
            const currentPlayer = this.getCurrentPlayer();
            // 2. Получить у него ход (координаты клетки)
            const playerMove = await currentPlayer.makeMove(this.values.slice(), this.turn);
            // 3. Присвоить его ход к нашему сетапу
            if (playgroundTableIndexes.includes(playerMove.col) &&
            playgroundTableIndexes.includes(playerMove.row)){
                
                this.values[playerMove.row][playerMove.col] = this.turn;
            } else {
                throw new Error(`Coords indexes playerMove = ${playerMove} not alloved`);
            }
            // 4. Сделать очередь следующего игрока
            gameRunning = !this.isGameOver();
            this.newTurn();
        }
    }

    private isGameOver(): boolean{
        const helper = new PlaygroundTableHelper(this.values);

        for (const row of helper.indexes){
            const info = helper.getRowInfo(row);
            if (info.oPoints === 3 || info.xPoints === 3){
                return true;
            }
        }

        for (const col of helper.indexes){
            const info = helper.getColInfo(col);
            if (info.oPoints === 3 || info.xPoints === 3){
                return true;
            }
        }

        for (const diag of helper.diagIndexes){
            const info = helper.getDiagInfo(diag);
            if (info.oPoints === 3 || info.xPoints === 3){
                return true;
            }
        }

        const allInfo = helper.getAllInfo();
        if (allInfo.emptyPoints === 0){
            return true;
        }

        return false;
    }

    private render(){
        for (let row = 0; row < 3; row ++){
            const tableRow = document.createElement('tr');
            this.tableForRender.appendChild(tableRow);

            for (let col = 0; col < 3; col ++){
                const cell = document.createElement('td');
                cell.dataset.col = col.toString();
                cell.dataset.row = row.toString();

                tableRow.appendChild(cell);

                cell.addEventListener('click', event => {
                    if (event.target){
                        const target: HTMLElement = event.target as HTMLElement;

                        if (target.className === ''){
                            const col = parseInt(target.dataset.col || '0');
                            const row = parseInt(target.dataset.row || '0');
                            this.trigger('click', [col, row]);
                        }
                    }
                })
            }
        }
        this.trigger('render');
    }

    public activate(){

    }

    public deactivate(){

    }
}
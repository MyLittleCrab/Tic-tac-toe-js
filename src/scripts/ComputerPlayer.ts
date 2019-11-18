import { PlaygroundTable, Coords, Playground, XOValue } from './Playground';
import IPlayer from './IPlayer';
import { PlaygroundTableHelper } from './PlaygroundTableHelper';
import Utils from './Utils';

export default class ComputerPlayer implements IPlayer{

    public playground: Playground | undefined;

    constructor(){
    }

    public async makeMove(playgroundTable: PlaygroundTable, xo: XOValue): Promise<Coords>{
        // 1. Если у компьютера остаётся один ход до победы: атакуем и побеждаем
        //     1.1 По строкам
        //     1.2 По столбцам
        //     1.3 по диагоналям
        // 2. Если требуется защита -- защищаемся
        //     2.1 по строкам
        //     2.2 по столбцам
        //     2.3 по диагоналям
        // 3. Если ничего интересного -- атакуем
        //     3.1 Свободен центр -- занимаем
        //     3.2 Если у нас нет ноликов -- ставим в рандомную клетку
        //     3.3 Если нолик один -- пытаемся рассмотреть его в контексте строк/столбцов/диагоналей
        // 4. Если понимаем, что победить совсем не получится -- ставим в рандомную точку


        const helper = new PlaygroundTableHelper(playgroundTable);
        //  Если остался один ход до победы -- делаем:
        // по строкам:
        for (const row of helper.indexes){
            const info = helper.getRowInfo(row);
            const enemyPoints = xo === XOValue.O ? info.xPoints : info.oPoints;
            if (info.emptyPoints === 1 && enemyPoints === 0){
                return helper.getRandomEmptyCellOnRow(row);
            }
        }

        // По столбцам:
        for (const col of helper.indexes){
            const info = helper.getColInfo(col);
            const enemyPoints = xo === XOValue.O ? info.xPoints : info.oPoints;
            if (info.emptyPoints === 1 && enemyPoints === 0){
                return helper.getRandomEmptyCellOnCol(col);
            }            
        }

        // по диагоналям
        for (const diag of helper.diagIndexes){
            const info = helper.getDiagInfo(diag);
            const enemyPoints = xo === XOValue.O ? info.xPoints : info.oPoints;
            if (info.emptyPoints === 1 && enemyPoints === 0){
                return helper.getRandomEmptyCellOnDiag(diag);
            }   
        }

        // Если требуется защита -- защищаемся
        // по строкам:
        for (const row of helper.indexes){
            const info = helper.getRowInfo(row);
            const enemyPoints = xo === XOValue.O ? info.xPoints : info.oPoints;
            if (info.emptyPoints > 0 && enemyPoints === 2){
                return helper.getRandomEmptyCellOnRow(row);
            }
        }

        // По столбцам:
        for (const col of helper.indexes){
            const info = helper.getColInfo(col);
            const enemyPoints = xo === XOValue.O ? info.xPoints : info.oPoints;
            if (info.emptyPoints > 0 && enemyPoints === 2){
                return helper.getRandomEmptyCellOnCol(col);
            }            
        }

        // по диагоналям
        for (const diag of helper.diagIndexes){
            const info = helper.getDiagInfo(diag);
            const enemyPoints = xo === XOValue.O ? info.xPoints : info.oPoints;
            if (info.emptyPoints > 0 && enemyPoints === 2){
                return helper.getRandomEmptyCellOnDiag(diag);
            }   
        }        

        // если ничего интересного -- атакуем
        // Если свободен центр -- занимаем
        const center = helper.getRow(1)[1];
        if (!center.value){
            return center.coords;
        }

        // Если у нас нет ходов и нечего продолжать -- ставим в рандомную клетку
        const allInfo = helper.getAllInfo();
        const myPoints = xo === XOValue.O ? allInfo.oPoints : allInfo.xPoints;
        if (myPoints === 0){
            return helper.getRandomEmptyCell();
        }

        // Если у нас всего одна точка, то пытаемся его рассмотреть в контексте
        // текущих строк/стобцов/диагоналей
        if (myPoints === 1){
            const myPointsArr = xo === XOValue.O ? helper.getOPoints() : helper.getXPoints();
            const myPoint = myPointsArr[0];

            // row
            const rowInfo = helper.getRowInfo(myPoint.coords.row);
            const rowEnemyPoints = xo === XOValue.O ? rowInfo.xPoints : rowInfo.oPoints;
            if (rowEnemyPoints === 0){
                return helper.getRandomEmptyCellOnRow(myPoint.coords.row);
            }

            // col
            const colInfo = helper.getColInfo(myPoint.coords.col);
            const colEnemyPoints = xo === XOValue.O ? colInfo.xPoints : colInfo.oPoints;
            if (colEnemyPoints === 0){
                return helper.getRandomEmptyCellOnCol(myPoint.coords.col);
            }

            // diag
            for (const index of helper.diagIndexes){
                const coords = helper.getDiagIndexes(index);
                if (Utils.arrayIncludes(coords, myPoint.coords)){
                    // Если наша точка является частью какой-то диагонали
                    return helper.getRandomEmptyCellOnDiag(index);
                }
            }
        }

        if (allInfo.emptyPoints > 0){
            return helper.getRandomEmptyCell();
        } else {
            throw new Error("No one empty cell in playground!");
        }
    }
}
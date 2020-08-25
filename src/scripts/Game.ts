import IPlayer from './IPlayer';
import Renderer from './Renderer';
import GameState from './GameState';
import { XOValue } from './types';

export default class Game {
    private state: GameState;

    constructor(private player1: IPlayer,
        private player2: IPlayer,
        private renderer: Renderer) {
        
        this.state = new GameState();
        this.gameLoop();
    }

    private async gameLoop(): Promise<void>{

        await this.renderer.watchForState(this.state.readonly());
        this.player1.watchForState(this.state.readonly());
        this.player2.watchForState(this.state.readonly());

        while(this.state.hasEmptyCells()){
            const player1Move = await this.player1.makeMove();
            this.state.setPlayerMove(player1Move, XOValue.X);

            const player2Move = await this.player2.makeMove();
            this.state.setPlayerMove(player2Move, XOValue.O);
        }
    }
};

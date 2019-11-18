import '../styles/app.scss';

// import { Greeter } from './greeter';

// const greeter: Greeter = new Greeter('kresty');

// greeter.start(document.getElementById('app'));

import {Playground} from "./Playground";
import Player from './Player';
import ComputerPlayer from './ComputerPlayer';

let mainTable: HTMLElement | null = document.querySelector('.main-table');

if (mainTable){

    const playerX = new Player();
    const playerO = new ComputerPlayer();
    const playground = new Playground(mainTable, playerX, playerO);

    
}

   
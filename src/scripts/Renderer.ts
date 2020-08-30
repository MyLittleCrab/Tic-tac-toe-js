import IGameStateReadable from './IGameStateReadable';
import { CellValue, Coords } from './types';
import UserInterface from './UserInterface';
// Подумать над тем, чтобы переименовать UserInterface и Renderer
export default class Renderer {
  constructor(private ui: UserInterface) {}
  public async watchForState(state: IGameStateReadable): Promise<void> {
    state.on('change', (move: Coords, xo: CellValue)=> this.renderChange(move, xo));
  }

  public async renderChange(move: Coords, xo: CellValue): Promise<void> {
    this.ui.setValue(move, xo);
  }
}

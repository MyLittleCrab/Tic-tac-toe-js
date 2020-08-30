import Eventable from './Eventable';
import { Coords, CellValue } from './types';

// Подумать над тем, чтобы переименовать UserInterface и Renderer

export default class UserInterface extends Eventable {
  private tableForRender: HTMLElement | null = null;
  // пока на html. По хорошему, хотелось бы рендерить на канвасе
  constructor() {
    super();
    this.render();
  }

  public setValue(coord: Coords, value: CellValue) {
    const cell = document.querySelector(`.cell[data-col="${coord.col}"][data-row="${coord.row}"]`);
    if (cell) {
      cell.textContent = value;
    }
  }

  private render() {
    this.tableForRender = document.createElement('table');
    for (let row = 0; row < 3; row++) {
      const tableRow = document.createElement('tr');
      this.tableForRender.appendChild(tableRow);

      for (let col = 0; col < 3; col++) {
        const cell = document.createElement('td');
        cell.dataset.col = col.toString();
        cell.dataset.row = row.toString();
        cell.className = 'cell';

        tableRow.appendChild(cell);

        cell.addEventListener('click', event => {
          if (event.target) {
            const target: HTMLElement = event.target as HTMLElement;

            if (target.className === 'cell') {
              const col = parseInt(target.dataset.col || '0');
              const row = parseInt(target.dataset.row || '0');
              this.trigger('click', [row, col]);
            }
          }
        });
      }
    }
    document.body.append(this.tableForRender);
  }
}

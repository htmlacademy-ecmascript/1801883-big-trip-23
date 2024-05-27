import AbstractView from '../framework/view/abstract-view';
import { Filters } from '../consts.js';


const createEmptyListTemplate = (currentFilter) => `<p class="trip-events__msg">${Filters[currentFilter].emptyMessage}</p>`;

export default class EmptyListView extends AbstractView {
  #currentFilter = null;

  constructor({currentFilter}) {
    super();
    this.#currentFilter = currentFilter.toUpperCase();
  }

  get template() {
    return createEmptyListTemplate(this.#currentFilter);
  }
}

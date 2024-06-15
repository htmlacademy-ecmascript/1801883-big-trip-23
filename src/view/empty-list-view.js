import AbstractView from '../framework/view/abstract-view';


const createEmptyListTemplate = (emptyMessage) => `<p class="trip-events__msg">${emptyMessage}</p>`;

export default class EmptyListView extends AbstractView {
  #emptyMessage = null;

  constructor({currentFilter}) {
    super();
    this.#emptyMessage = currentFilter.emptyMessage;
  }

  get template() {
    return createEmptyListTemplate(this.#emptyMessage);
  }
}

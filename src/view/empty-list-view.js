import AbstractView from '../framework/view/abstract-view';

const LoadMessgae = {
  LOADING: 'Loading...',
  FAILURE: 'Failed to load latest route information'
};

const createEmptyListTemplate = (emptyMessage) => `<p class="trip-events__msg">${emptyMessage}</p>`;

export default class EmptyListView extends AbstractView {
  #emptyMessage = null;

  constructor({currentFilter, isLoading, isLoadFailure}) {
    super();
    if (isLoading) {
      this.#emptyMessage = LoadMessgae.LOADING;
      return;
    }
    if (isLoadFailure) {
      this.#emptyMessage = LoadMessgae.FAILURE;
      return;
    }
    this.#emptyMessage = currentFilter.emptyMessage;
  }

  get template() {
    return createEmptyListTemplate(this.#emptyMessage);
  }
}

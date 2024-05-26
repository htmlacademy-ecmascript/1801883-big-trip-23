import { RenderPosition, render } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';


export default class HeaderPresenter {
  #tripInfoContainerElement = null;
  #filtersContainerElement = null;
  #model = null;
  #tripInfoView = new TripInfoView();
  #filtersView = new FiltersView();

  #events = [];

  constructor ({tripInfoContainer, filtersContainer, model}) {
    this.#tripInfoContainerElement = tripInfoContainer;
    this.#filtersContainerElement = filtersContainer;
    this.#model = model;
  }

  #renderTripInfo() {
    render(this.#tripInfoView, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    render(this.#filtersView, this.#filtersContainerElement);
  }

  init () {
    this.#events = [...this.#model.events];

    this.#renderTripInfo();
    this.#renderFilters();
  }
}

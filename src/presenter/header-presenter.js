import { RenderPosition, render } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';


export default class HeaderPresenter {
  #tripInfoContainerElement = null;
  #filtersContainerElement = null;
  #model = null;
  #tripInfoView = null;
  #filtersView = null;

  #events = [];

  constructor ({tripInfoContainer, filtersContainer, model}) {
    this.#tripInfoContainerElement = tripInfoContainer;
    this.#filtersContainerElement = filtersContainer;
    this.#model = model;
  }

  #renderTripInfo() {
    this.#tripInfoView = new TripInfoView();
    render(this.#tripInfoView, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    this.#filtersView = new FiltersView();
    render(this.#filtersView, this.#filtersContainerElement);
  }

  init () {
    this.#events = [...this.#model.events];

    this.#renderTripInfo();
    this.#renderFilters();
  }
}

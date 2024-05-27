import { RenderPosition, render } from '../framework/render.js';
import { Filters } from '../consts.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';


export default class HeaderPresenter {
  #tripInfoContainerElement = null;
  #filtersContainerElement = null;
  #model = null;
  #tripInfoView = null;
  #filtersView = null;

  #destinations = [];
  #events = [];
  #filteredEvents = {};
  #currentFilter = Filters.EVERYTHING.name;

  constructor ({tripInfoContainer, filtersContainer, eventsModel}) {
    this.#tripInfoContainerElement = tripInfoContainer;
    this.#filtersContainerElement = filtersContainer;
    this.#model = eventsModel;
  }

  #renderTripInfo() {
    this.#tripInfoView = new TripInfoView(
      {
        events: this.#events,
        destinations: this.#destinations
      }
    );
    render(this.#tripInfoView, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    Object.values(Filters).forEach((filter) => {
      this.#filteredEvents[filter.name] = filter.filterMethod(this.#events);
    });

    this.#filtersView = new FiltersView(
      {
        currentFilter: this.#currentFilter,
        filteredEvents: this.#filteredEvents
      }
    );

    render(this.#filtersView, this.#filtersContainerElement);
  }

  init () {
    this.#destinations = [...this.#model.destinations];
    this.#events = [...this.#model.events];

    this.#renderTripInfo();
    this.#renderFilters();
  }
}

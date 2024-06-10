import { RenderPosition, render, replace, remove } from '../framework/render.js';
import { Filters, SortTypes, UpdateType } from '../consts.js';
import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';


export default class HeaderPresenter {
  #tripInfoContainerElement = null;
  #filtersContainerElement = null;
  #filterModel = null;
  #eventsModel = null;
  #tripInfoView = null;
  #filtersView = null;

  constructor ({tripInfoContainer, filtersContainer, filterModel, eventsModel}) {
    this.#tripInfoContainerElement = tripInfoContainer;
    this.#filtersContainerElement = filtersContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#filterModel.addObserver(this.#onModelChange);
    this.#eventsModel.addObserver(this.#onModelChange);
  }

  get #events () {
    return [...this.#eventsModel.events].sort(SortTypes.DAY.sortMethod);
  }

  get #destinations () {
    return this.#eventsModel.destinations;
  }

  get #offers () {
    return this.#eventsModel.offers;
  }

  get #currentFilter () {
    return this.#filterModel.filter;
  }

  init () {
    this.#renderTripInfo();
    this.#renderFilters();
  }

  #renderTripInfo() {
    const prevTripInfoView = this.#tripInfoView;

    this.#tripInfoView = new TripInfoView(
      {
        events: this.#events,
        offers: this.#offers,
        destinations: this.#destinations
      }
    );

    if (prevTripInfoView === null) {
      render(this.#tripInfoView, this.#tripInfoContainerElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoView, prevTripInfoView);
    remove(prevTripInfoView);
  }

  #renderFilters() {
    const prevFiltersView = this.#filtersView;
    const events = this.#events;
    const filteredEvents = {};

    Object.values(Filters).forEach((filter) => {
      filteredEvents[filter.name] = filter.filterMethod(events).length;
    });

    this.#filtersView = new FiltersView(
      {
        currentFilter: this.#currentFilter.name,
        filteredEvents: filteredEvents,
        onFilterChange: this.#onFilterChange
      }
    );

    if (prevFiltersView === null) {
      render(this.#filtersView, this.#filtersContainerElement);
      return;
    }

    replace(this.#filtersView, prevFiltersView);
    remove(prevFiltersView);
  }

  #onFilterChange = (updatedFilter) => {
    this.#filterModel.filter = Filters[updatedFilter];
  };

  #onModelChange = (updateType) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#renderTripInfo();
        break;
      case UpdateType.MAJOR:
        this.#renderTripInfo();
        this.#renderFilters();
        break;
    }
  };
}

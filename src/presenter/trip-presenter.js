import { RenderPosition, render, replace, remove } from '../framework/render.js';
import { SortTypes, UserAction, UpdateType } from '../consts.js';
import EventsListView from '../view/events-list-view.js';
import SortPanelView from '../view/sort-panel-view.js';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter.js';


export default class TripPresenter {
  #eventsContainerElement = null;
  #filterModel = null;
  #eventsModel = null;
  #emptyListView = null;
  #sortPanelView = null;
  #eventsListView = new EventsListView();
  #eventPresenters = new Map();
  #currentSortType = SortTypes.DAY.name;

  constructor ({eventsContainer, filterModel, eventsModel}) {
    this.#eventsContainerElement = eventsContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#filterModel.addObserver(this.#onModelChange);
    this.#eventsModel.addObserver(this.#onModelChange);
  }

  get #events () {
    const sortType = SortTypes[this.#currentSortType.toUpperCase()];
    const sortedEvents = [...this.#eventsModel.events].sort(sortType.sortMethod);
    return this.#currentFilter.filterMethod(sortedEvents);
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

  init() {
    this.#renderSortPanel();
    this.#renderEventsList();
  }

  #renderEmptyList() {
    this.#emptyListView = new EmptyListView({currentFilter: this.#currentFilter});
    render(this.#emptyListView, this.#eventsContainerElement);
  }

  #renderSortPanel() {
    const prevSortPanelView = this.#sortPanelView;

    this.#sortPanelView = new SortPanelView(
      {
        currentSortType: this.#currentSortType,
        onSortTypeChange: this.#onSortTypeChange
      }
    );

    if (prevSortPanelView === null) {
      render(this.#sortPanelView, this.#eventsContainerElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#sortPanelView, prevSortPanelView);
    remove(prevSortPanelView);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter(
      {
        eventsListContainer: this.#eventsListView.element,
        closeAllForms: this.#closeAllForms,
        onEventUpdate: this.#onEventUpdate
      }
    );
    this.#eventPresenters.set(event.id, eventPresenter);

    eventPresenter.init(event, this.#offers, this.#destinations);
  }

  #renderEventsList(resetSortType = false) {
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY.name;
      this.#renderSortPanel();
    }

    this.#clearEventsList();

    if (this.#events.length === 0) {
      remove(this.#sortPanelView);
      this.#sortPanelView = null;
      this.#renderEmptyList();
      return;
    }

    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item));
  }

  #clearEventsList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#eventsListView);
    remove(this.#emptyListView);
  };

  #closeAllForms = () => {
    this.#eventPresenters.forEach((presenter) => presenter.closeForm());
  };

  #onEventUpdate = (action, updateType, updatedEvent) => {
    switch (action) {
      case UserAction.UPDATE:
        this.#eventsModel.updateEvent(updateType, updatedEvent);
        break;
      case UserAction.ADD:
        this.#eventsModel.addEvent(updateType, updatedEvent);
        break;
      case UserAction.DELETE:
        this.#eventsModel.deleteEvent(updateType, updatedEvent);
        break;
    }
  };

  #onModelChange = (updateType, updatedItem) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#eventPresenters.get(updatedItem.id).init(updatedItem);
        break;
      case UpdateType.MAJOR:
        this.#renderEventsList(updatedItem.isFilterChange);
        break;
    }
  };

  #onSortTypeChange = (currentSortType = this.#currentSortType) => {
    this.#currentSortType = currentSortType;
    this.#renderEventsList();
  };
}

import { RenderPosition, render, remove } from '../framework/render.js';
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
    return this.#currentFilter.filterMethod(
      [...this.#eventsModel.events].sort(SortTypes[this.#currentSortType.toUpperCase()].sortMethod)
    );
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
    this.#sortPanelView = new SortPanelView(
      {
        currentSortType: this.#currentSortType,
        onSortTypeChange: this.#onSortTypeChange
      }
    );
    render(this.#sortPanelView, this.#eventsContainerElement, RenderPosition.AFTERBEGIN);
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
    }

    this.#clearEventsList();

    if (this.#events.length === 0) {
      remove(this.#sortPanelView);
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

  #onModelChange = (updateType, updatedEvent) => {
    switch (updateType) {
      case UpdateType.MINOR:
        this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
        break;
      case UpdateType.MAJOR:
        this.#renderEventsList();
        break;
    }
  };

  #onSortTypeChange = (currentSortType = this.#currentSortType) => {
    this.#currentSortType = currentSortType;
    this.#renderEventsList();
  };
}

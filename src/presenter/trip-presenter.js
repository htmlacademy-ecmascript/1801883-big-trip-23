import { RenderPosition, render } from '../framework/render.js';
import { Filters, SortTypes } from '../consts.js';
import { updateItem } from '../utils/common.js';
import EventsListView from '../view/events-list-view.js';
import SortPanelView from '../view/sort-panel-view.js';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter.js';


export default class TripPresenter {
  #eventsContainerElement = null;
  #model = null;
  #emptyListView = null;
  #sortPanelView = null;
  #eventsListView = new EventsListView();
  #eventPresenters = new Map();

  #destinations = [];
  #offers = [];
  #events = [];
  #currentFilter = Filters.EVERYTHING.name;
  #currentSortType = SortTypes.DAY.name;

  constructor ({eventsContainer, eventsModel}) {
    this.#eventsContainerElement = eventsContainer;
    this.#model = eventsModel;
  }

  #renderEmptyList() {
    this.#emptyListView = new EmptyListView({currentFilter: this.#currentFilter});
    render(this.#emptyListView, this.#eventsContainerElement);
  }

  #renderSortPanel() {
    this.#sortPanelView = new SortPanelView(
      {
        currentSortType: this.#currentSortType,
        onSortTypeChange: this.#closeAllForms
      }
    );
    render(this.#sortPanelView, this.#eventsContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const taskPresenter = new EventPresenter(
      {
        eventsListContainer: this.#eventsListView.element,
        closeAllForms: this.#closeAllForms,
        onEventChange: this.#updateEvent
      }
    );
    this.#eventPresenters.set(event.id, taskPresenter);

    taskPresenter.init(event, this.#offers, this.#destinations);
  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item));
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #updateEvent = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #closeAllForms = () => {
    this.#eventPresenters.forEach((presenter) => presenter.closeForm());
  };


  init() {
    this.#destinations = [...this.#model.destinations];
    this.#offers = [...this.#model.offers];
    this.#events = [...this.#model.events];

    if (this.#events.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSortPanel();
    this.#renderEventsList();
  }
}

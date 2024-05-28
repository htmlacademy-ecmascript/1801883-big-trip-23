import { RenderPosition, render } from '../framework/render.js';
import { Filters } from '../consts.js';
import EventsListView from '../view/events-list-view.js';
import SortPanelView from '../view/sort-panel-view.js';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter.js';


export default class EventsPresenter {
  #eventsContainerElement = null;
  #model = null;
  #emptyListView = null;
  #sortPanelView = new SortPanelView();
  #eventsListView = new EventsListView();

  #destinations = [];
  #offers = [];
  #events = [];
  #currentFilter = Filters.EVERYTHING.name;

  constructor ({eventsContainer, eventsModel}) {
    this.#eventsContainerElement = eventsContainer;
    this.#model = eventsModel;
  }

  #renderEmptyList() {
    this.#emptyListView = new EmptyListView({currentFilter: this.#currentFilter});
    render(this.#emptyListView, this.#eventsContainerElement);
  }

  #renderSortPanel() {
    render(this.#sortPanelView, this.#eventsContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const taskPresenter = new EventPresenter({eventsListContainer: this.#eventsListView.element});
    taskPresenter.init(event, this.#offers, this.#destinations);
  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item));
  }

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

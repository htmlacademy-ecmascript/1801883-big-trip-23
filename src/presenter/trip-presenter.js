import { RenderPosition, render, remove } from '../framework/render.js';
import { Filters, SortTypes } from '../consts.js';
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

  #currentFilter = Filters.EVERYTHING.name;
  #currentSortType = SortTypes.DAY.name;

  constructor ({eventsContainer, eventsModel}) {
    this.#eventsContainerElement = eventsContainer;
    this.#model = eventsModel;

    this.#model.addObserver(this.#onModelChange);
  }

  get #events () {
    return [...this.#model.events].sort(SortTypes[this.#currentSortType.toUpperCase()].sortMethod);
  }

  get #destinations () {
    return this.#model.destinations;
  }

  get #offers () {
    return this.#model.offers;
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

  #renderEventsList() {
    if (this.#events.length === 0) {
      this.#renderEmptyList();
      return;
    }

    if (this.#eventPresenters.size > 0) {
      this.#clearEventsList();
    }

    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item));
  }

  #clearEventsList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    remove(this.#eventsListView);
  };

  #closeAllForms = () => {
    this.#eventPresenters.forEach((presenter) => presenter.closeForm());
  };

  #onEventUpdate = (action, updateType, updatedEvent) => {
    console.log(action, updateType, updatedEvent);
    // Здесь будем вызывать обновление модели.
    // action - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // updatedEvent - обновленные данные

    // this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #onModelChange = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #onSortTypeChange = (currentSortType = this.#currentSortType) => {
    this.#currentSortType = currentSortType;
    this.#renderEventsList();
  };
}

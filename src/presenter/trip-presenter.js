import { RenderPosition, render, replace, remove } from '../framework/render.js';
import { SortTypes, UserAction, UpdateType } from '../consts.js';
import EventsListView from '../view/events-list-view.js';
import SortPanelView from '../view/sort-panel-view.js';
import EmptyListView from '../view/empty-list-view';
import NewEventPresenter from './new-event-presenter.js';
import EventPresenter from './event-presenter.js';


export default class TripPresenter {
  #eventsContainerElement = null;
  #newEventButtonElement = null;
  #filterModel = null;
  #eventsModel = null;
  #emptyListView = null;
  #sortPanelView = null;
  #eventsListView = new EventsListView();
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortTypes.DAY.name;
  #isNewEventMode = false;
  #isLoading = true;

  constructor ({eventsContainer, newEventButton, filterModel, eventsModel}) {
    this.#eventsContainerElement = eventsContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#newEventButtonElement = newEventButton;

    this.#newEventButtonElement.addEventListener('click', this.#renderNewEventForm);
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

  #renderEmptyList(isLoadFailure) {
    this.#emptyListView = new EmptyListView(
      {
        currentFilter: this.#currentFilter,
        isLoading: this.#isLoading,
        isLoadFailure: isLoadFailure
      }
    );
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

  #renderEventsList = (resetSortType = false, isLoadFailure = false) => {
    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY.name;
      this.#renderSortPanel();
    }

    this.#clearEventsList();

    if (this.#events.length === 0) {
      remove(this.#sortPanelView);
      this.#sortPanelView = null;

      if (!this.#isNewEventMode || this.#isLoading || isLoadFailure) {
        this.#renderEmptyList(isLoadFailure);
        return;
      }
    }
    this.#isNewEventMode = false;

    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item));
  };

  #clearEventsList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
    }
    remove(this.#eventsListView);

    if (this.#emptyListView) {
      remove(this.#emptyListView);
      this.#emptyListView = null;
    }
  };

  #renderNewEventForm = () => {
    this.#isNewEventMode = true;
    this.#filterModel.resetFilter();

    this.#newEventPresenter = new NewEventPresenter(
      {
        eventsListContainer: this.#eventsListView.element,
        newEventButtonElement: this.#newEventButtonElement,
        onEventAdd: this.#onEventUpdate,
        onFormClose: this.#renderEventsList
      }
    );

    this.#newEventPresenter.init(this.#offers, this.#destinations);
  };

  #closeAllForms = () => {
    this.#eventPresenters.forEach((presenter) => presenter.closeForm());
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
    }
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
        this.#isLoading = false;
        this.#renderEventsList(updatedItem.isFilterChange, updatedItem.isLoadFailure);
        break;
    }
  };

  #onSortTypeChange = (currentSortType = this.#currentSortType) => {
    this.#currentSortType = currentSortType;
    this.#renderEventsList();
  };
}

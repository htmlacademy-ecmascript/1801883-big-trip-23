import { render, replace } from '../framework/render.js';
import SortPanelView from '../view/sort-panel-view.js';
import EmptyListView from '../view/empty-list-view';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';


export default class EventsPresenter {
  #eventsContainerElement = null;
  #model = null;
  #emptyListView = null;
  #sortPanelView = new SortPanelView();
  #eventsListView = new EventsListView();

  #destinations = [];
  #offers = [];
  #events = [];
  #currentFilter = 'everything';

  constructor ({eventsContainer, model}) {
    this.#eventsContainerElement = eventsContainer;
    this.#model = model;
  }

  #renderEmptyList() {
    this.#emptyListView = new EmptyListView({currentFilter: this.#currentFilter});
    render(this.#emptyListView, this.#eventsContainerElement);
  }

  #renderSortPanel() {
    render(this.#sortPanelView, this.#eventsContainerElement);
  }

  #renderEvent(event, offers, destinations) {
    let isEditMode = false;

    const eventItemView = new EventItemView({
      event,
      offers,
      destinations,
      onRollupButtonClick: switchEventAndForm
    });

    const formEditView = new FormView({
      event,
      offers,
      destinations,
      onFormSubmit: switchEventAndForm,
      onCancelClick: switchEventAndForm
    });


    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        switchEventAndForm();
      }
    };

    function switchEventAndForm () {
      let newComponent;
      let oldComponent;

      if (isEditMode) {
        newComponent = eventItemView;
        oldComponent = formEditView;
        document.removeEventListener('keydown', onEscKeydown);
      } else {
        newComponent = formEditView;
        oldComponent = eventItemView;
        document.addEventListener('keydown', onEscKeydown);
      }
      isEditMode = !isEditMode;
      replace(newComponent, oldComponent);
    }

    render(eventItemView, this.#eventsListView.element);
  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item, this.#offers, this.#destinations));
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

import { render, replace } from '../framework/render.js';
import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';


export default class EventsPresenter {
  #eventsContainerElement = null;
  #model = null;
  #eventsListView = new EventsListView();

  #destinations = [];
  #offers = [];
  #events = [];

  constructor ({eventsContainer, model}) {
    this.#eventsContainerElement = eventsContainer;
    this.#model = model;
  }


  #renderEvent(event, offers, destinations) {

    const eventItemView = new EventItemView({
      event,
      offers,
      destinations,
      onButtonClick: () => replaceEventToForm()
    });

    const formEditView = new FormView({
      event,
      offers,
      destinations,
      onFormSubmit: () => replaceFormToEvent(),
      onCancelClick: () => replaceFormToEvent(),
    });


    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
      }
    };

    function replaceEventToForm () {
      replace(formEditView, eventItemView);
      document.addEventListener('keydown', onEscKeydown);
    }

    function replaceFormToEvent () {
      replace(eventItemView, formEditView);
      document.removeEventListener('keydown', onEscKeydown);
    }


    render(eventItemView, this.#eventsListView.element);
  }

  init () {
    this.#destinations = [...this.#model.destinations];
    this.#offers = [...this.#model.offers];
    this.#events = [...this.#model.events];

    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item, this.#offers, this.#destinations));
  }
}

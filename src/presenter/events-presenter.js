import { render } from '../framework/render.js';
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
    const eventItemView = new EventItemView({event, offers, destinations});
    // const formEditView = new FormView({event, offers, destinations});

    render(eventItemView, this.#eventsListView.element);
  }

  init () {
    this.#destinations = [...this.#model.destinations];
    this.#offers = [...this.#model.offers];
    this.#events = [...this.#model.events];

    render(this.#eventsListView, this.#eventsContainerElement);
    render(new FormView({offers: this.#offers, destinations: this.#destinations}), this.#eventsListView.element);
    render(new FormView({event: this.#events[0], offers: this.#offers, destinations: this.#destinations}), this.#eventsListView.element);

    this.#events.forEach((item) => this.#renderEvent(item, this.#offers, this.#destinations));
  }
}

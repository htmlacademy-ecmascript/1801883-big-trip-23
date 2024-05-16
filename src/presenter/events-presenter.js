import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';
import { render } from '../render.js';


export default class EventsPresenter {

  eventsListView = new EventsListView();

  constructor ({eventsContainer, model}) {
    this.eventsContainerElement = eventsContainer;
    this.model = model;
  }

  init () {
    this.destinations = [...this.model.getDestinations()];
    this.offers = [...this.model.getOffers()];
    this.events = [...this.model.getEvents()];

    // console.log('Event: ', this.events[0]);
    // console.log('------------------------------------------------------');

    render(this.eventsListView, this.eventsContainerElement);
    render(new FormView({offers: this.offers, destinations: this.destinations}), this.eventsListView.getElement());
    render(new FormView({event: this.events[0], offers: this.offers, destinations: this.destinations}), this.eventsListView.getElement());

    for (let i = 1; i < this.events.length; i++) {
      render(new EventItemView({event: this.events[i], offers: this.offers, destinations: this.destinations}), this.eventsListView.getElement());
    }
  }
}

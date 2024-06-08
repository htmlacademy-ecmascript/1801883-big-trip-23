import Observable from '../framework/observable.js';
import { getMockOffers } from '../mock/offers-data.js';
import { getMockDestinations } from '../mock/destinations-data.js';
import { getMockEvents } from '../mock/events-data.js';


export default class EventsModel extends Observable {
  #offers = getMockOffers();
  #destinations = getMockDestinations();
  #events = getMockEvents(this.#offers, this.#destinations);

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get events() {
    return this.#events;
  }

  updateEvent(updateType, updatedEvent) {
    this.#events = this.#events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
    this._notify(updateType, updatedEvent);
  }

  addEvent(updateType, newEvent) {
    this.#events.push(newEvent);
    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, deletedEvent) {
    this.#events = this.#events.filter((event) => event.id !== deletedEvent.id);
    this._notify(updateType, deletedEvent);
  }
}

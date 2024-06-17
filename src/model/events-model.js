import Observable from '../framework/observable.js';
import { UpdateType } from '../consts.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #isLoadFailure = false;
  #events = [];
  #offers = [];
  #destinations = [];

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get events() {
    return this.#events;
  }

  async init() {
    try {
      this.#events = await this.#eventsApiService.getEvents();
      this.#offers = await this.#eventsApiService.getOffers();
      this.#destinations = await this.#eventsApiService.getDestinations();

    } catch(err) {
      this.#events = [];
      this.#offers = [];
      this.#destinations = [];
      this.#isLoadFailure = true;
    }

    this._notify(UpdateType.MAJOR, {isLoadFailure: this.#isLoadFailure});
    return this.#isLoadFailure;
  }

  async updateEvent(updateType, updatedEvent) {
    try {
      const responseEvent = await this.#eventsApiService.updateEvent(updatedEvent);
      this.#events = this.#events.map((event) => event.id === responseEvent.id ? responseEvent : event);

      this._notify(updateType, responseEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  addEvent(updateType, newEvent) {
    this.#events = [...this.#events, newEvent];
    this._notify(updateType, newEvent);
  }

  deleteEvent(updateType, deletedEvent) {
    this.#events = this.#events.filter((event) => event.id !== deletedEvent.id);
    this._notify(updateType, deletedEvent);
  }
}

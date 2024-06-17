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
      this.#events = await this.#eventsApiService.event;
      this.#offers = await this.#eventsApiService.offers;
      this.#destinations = await this.#eventsApiService.destinations;

    } catch(err) {
      this.#events = [];
      this.#offers = [];
      this.#destinations = [];
      this.#isLoadFailure = true;
    }

    this._notify(UpdateType.MAJOR, {isLoadFailure: this.#isLoadFailure});
    return this.#isLoadFailure;
  }

  updateEvent(updateType, updatedEvent) {
    this.#events = this.#events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
    this._notify(updateType, updatedEvent);
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

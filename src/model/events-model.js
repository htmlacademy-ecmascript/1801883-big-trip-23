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
      const responseUpdatedEvent = await this.#eventsApiService.updateEvent(updatedEvent);
      this.#events = this.#events.map((event) => event.id === responseUpdatedEvent.id ? responseUpdatedEvent : event);

      this._notify(updateType, responseUpdatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, newEvent) {
    try {
      const responseNewEvent = await this.#eventsApiService.addEvent(newEvent);
      this.#events = [...this.#events, responseNewEvent];

      this._notify(updateType, responseNewEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, deletedEvent) {
    try {
      const responseDeletedEvent = await this.#eventsApiService.deleteEvent(deletedEvent);
      if (responseDeletedEvent.ok) {
        this.#events = this.#events.filter((event) => event.id !== deletedEvent.id);
      }

      this._notify(updateType, deletedEvent);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }
}

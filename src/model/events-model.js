import { getMockOffers } from '../mock/offers-data.js';
import { getMockDestinations } from '../mock/destinations-data.js';
import { getMockEvents } from '../mock/events-data.js';


export default class EventsModel {
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
}

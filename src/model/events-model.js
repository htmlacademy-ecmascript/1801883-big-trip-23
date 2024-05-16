import { getMockOffers } from '../mock/offers-data.js';
import { getMockDestinations } from '../mock/destinations-data.js';
import { getMockEvents } from '../mock/events-data.js';


export default class EventsModel {
  offers = getMockOffers();
  destinations = getMockDestinations();
  events = getMockEvents(this.offers, this.destinations);

  getEvents() {
    return this.events;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}

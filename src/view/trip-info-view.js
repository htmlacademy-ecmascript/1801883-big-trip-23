import AbstractView from '../framework/view/abstract-view';
import { reformatDate, isDatesEqual, isMonthsEqual } from '../utils/event.js';


const createCitys = (destinations, quantity) => {
  let middleCity = quantity === 3 ? ` &mdash; ${destinations.slice(1,-1)}` : '';
  const lastCity = quantity > 1 ? ` &mdash; ${destinations[destinations.length - 1]}` : '';

  if (quantity > 3) {
    middleCity = ' &mdash; ...';
  }

  return destinations[0] + middleCity + lastCity;
};

const createDates = (startDate, endDate) => {
  let start = reformatDate(startDate).dayMonth;
  const end = reformatDate(endDate).dayMonth;

  if (isDatesEqual(startDate, endDate)) {
    return start;
  }

  if (isMonthsEqual(startDate, endDate)) {
    start = start.replace(/[^0-9]/g, '');
  }

  return `${start}&nbsp;&mdash;&nbsp${end}`;
};

const createTripInfoTemplate = (destinations, totalPrice, startDate, endDate) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">
        ${createCitys(destinations, destinations.length)}
      </h1>

      <p class="trip-info__dates">${createDates(startDate, endDate)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>
`;

export default class TripInfoView extends AbstractView {
  #events = null;
  #offers = null;
  #destinations = null;
  #totalPrice = null;
  #usedIdDestinations = null;
  #usedDestinations = null;
  #startDate = null;
  #endDate = null;

  constructor({events, offers, destinations}) {
    super();
    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#totalPrice = this.#events.reduce((accumulator, event) => accumulator + this.#calculateEventCost(event, this.#offers), 0);

    this.#usedIdDestinations = new Set(Array.from(events, (event) => event.destination));
    this.#usedDestinations = Array.from(this.#usedIdDestinations).map((id) => this.#destinations.find((destination) => destination.id === id).name);

    this.#startDate = this.#events[0].dateFrom;
    this.#endDate = this.#events[this.#events.length - 1].dateTo;
  }

  get template() {
    return createTripInfoTemplate(this.#usedDestinations, this.#totalPrice, this.#startDate, this.#endDate);
  }

  #calculateEventCost({basePrice, offers, type}, allOffers) {
    let offersCoast = 0;
    const allowedOffers = allOffers.find((item) => item.type === type).offers;

    offers.forEach((offer) => {
      offersCoast += allowedOffers.find((item) => item.id === offer).price;
    });

    return basePrice + offersCoast;
  }
}

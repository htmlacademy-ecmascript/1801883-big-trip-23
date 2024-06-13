import AbstractView from '../framework/view/abstract-view';


const createCity = (name, isLastElement) => `${name}${!isLastElement ? ' &mdash; ' : ''}`;

const createTripInfoTemplate = (totalPrice, destinations) => `
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">
      ${destinations.map((destination, index, array) => createCity(destination.name, index === array.length - 1)).join('')}
    </h1>

    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
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

  constructor({events, offers, destinations}) {
    super();
    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#totalPrice = this.#events.reduce((accumulator, event) => accumulator + this.#calculateEventCost(event, this.#offers), 0);

    this.#usedIdDestinations = new Set(Array.from(events, (event) => event.destination));
    this.#usedDestinations = destinations.filter((destination) => this.#usedIdDestinations.has(destination.id));
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice, this.#usedDestinations);
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

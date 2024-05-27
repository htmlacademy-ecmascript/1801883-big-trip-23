import AbstractView from '../framework/view/abstract-view';


const createCity = (name, isLastElement) => `${name}${!isLastElement ? ' &mdash; ' : ''}`;

const createTripInfoTemplate = (basePrice, destinations) => `
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">
      ${destinations.map((destination, index, array) => createCity(destination.name, index === array.length - 1)).join('')}
    </h1>

    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${basePrice}</span>
  </p>
</section>
`;

export default class TripInfoView extends AbstractView {
  #totalBasePrice = null;
  #usedIdDestinations = null;
  #usedDestinations = null;

  constructor({events, destinations}) {
    super();
    this.#totalBasePrice = events.reduce((accumulator, event) => accumulator + event.basePrice, 0);

    this.#usedIdDestinations = new Set(Array.from(events, (event) => event.destination));
    this.#usedDestinations = destinations.filter((destination) => this.#usedIdDestinations.has(destination.id));
  }

  get template() {
    return createTripInfoTemplate(this.#totalBasePrice, this.#usedDestinations);
  }
}

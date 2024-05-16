import { createElement } from '../render.js';
import { EVENT_TYPES } from '../consts.js';
import { capitalizeFirstLetter, reformatDate } from '../utils.js';

const EMPTY_EVENT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: undefined //EVENT_TYPES[0]
};


const createEventTypeItem = (type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === 'flight' ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
  </div>
`;

const createHeader = () => `
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${EVENT_TYPES.map((value) => createEventTypeItem(value)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
`;
// --------------------------------------------------


const createOfferItem = ({id, title, price}, isChecked) => `
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox visually-hidden"
      id="${id}"
      type="checkbox"
      name="event-offer-${title.toLowerCase().replace(/ /g, '-')}"
      ${isChecked ? 'checked' : ''}>

    <label class="event__offer-label" for="${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
`;

const createOffers = (typeOffers, selectedOffers) => `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${typeOffers.map((offer) => createOfferItem(offer, selectedOffers.includes(offer.id))).join('')}
    </div>
  </section>
`;


const createImageDestination = ({src, description}) => `
  <img class="event__photo" src="${src}" alt="${description}"></img>
`;

const createDestination = ({description, pictures}) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    ${ pictures.length !== 0
    ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((image) => createImageDestination(image)).join('')}
          </div>
        </div>
        `
    : ''}
  </section>
`;


const createFormTemplate = (event, allOffers, allDestinations) => {
  const {id, basePrice, dateFrom, dateTo, destination, offers, type} = event;

  const startDate = reformatDate(dateFrom);
  const endDate = reformatDate(dateTo);
  const currentDestination = allDestinations.find((item) => (item.id === destination));
  const typeOffers = type ? allOffers.find((item) => (item.type === type)).offers : '';

  // if (id) {
  //   console.log('typeOffers ', typeOffers);
  //   console.log('offers ', offers);
  //   console.log();
  // }

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${createHeader(id, basePrice, startDate, endDate, destination, type)}
        ${typeOffers.length !== 0 || currentDestination
      ? `
        <section class="event__details">
          ${typeOffers.length !== 0 ? createOffers(typeOffers, offers) : ''}
          ${currentDestination ? createDestination(currentDestination) : ''}
        </section>`
      : ''}
      </form>
    </li>`
  );
};

export default class FormView {
  constructor({event = EMPTY_EVENT, offers, destinations}) {
    this.event = event;
    this.allOffers = offers;
    this.allDestinations = destinations;
  }

  getTemplate() {
    return createFormTemplate(this.event, this.allOffers, this.allDestinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

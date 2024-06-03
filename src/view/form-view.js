import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES } from '../consts.js';
import { reformatDate } from '../utils/event.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const EMPTY_EVENT = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};


const createEventTypeItem = (type, selectedType) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${type === selectedType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
  </div>
`;

const createHeader = (id, basePrice, startDate, endDate, destination, allDestination, type) => `
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          ${type ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">` : ''}
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${EVENT_TYPES.map((value) => createEventTypeItem(value, type)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${type ? capitalizeFirstLetter(type) : ''}</label>
        <input
          class="event__input event__input--destination"
          id="event-destination-1"
          type="text" name="event-destination"
          value="${destination ? destination.name : ''}"
          list="destination-list-1">

        <datalist id="destination-list-1">
          ${allDestination.map((item) => `<option value="${item.name}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${id ? 'Delete' : 'Cancel'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
`;


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

const createOffers = (availableOffers, selectedOffers) => `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${availableOffers.map((offer) => createOfferItem(offer, selectedOffers.includes(offer.id))).join('')}
    </div>
  </section>
`;


const createDestination = ({description, pictures}) => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${ description
    ? `<p class="event__destination-description">${description}</p>`
    : ''}

    ${ pictures.length > 0
    ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${pictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}"></img>`).join('')}
          </div>
        </div>
        `
    : ''}
  </section>
`;


const createFormTemplate = (event, allDestinations) => {
  const {id, basePrice, dateFrom, dateTo, type, myDestination, myOffers, isOffersEnable, availableOffers} = event;
  const startDate = reformatDate(dateFrom);
  const endDate = reformatDate(dateTo);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${createHeader(id, basePrice, startDate.dateHoursMinute, endDate.dateHoursMinute, myDestination, allDestinations, type)}

        ${isOffersEnable || myDestination
      ? `
        <section class="event__details">
          ${isOffersEnable ? createOffers(availableOffers, myOffers) : ''}
          ${myDestination && (myDestination.description || myDestination.pictures.length > 0) ? createDestination(myDestination) : ''}
        </section>`
      : ''}
      </form>
    </li>`
  );
};

export default class FormView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #onFormSubmitCallback = null;
  #onCancelClickCallback = null;

  constructor({event = EMPTY_EVENT, offers, destinations, onFormSubmit, onCancelClick}) {
    super();
    this.#allOffers = offers;
    this.#allDestinations = destinations;
    this._state = this.#parseEvent(event);

    this.#onFormSubmitCallback = onFormSubmit;
    this.#onCancelClickCallback = onCancelClick;
    this.element.querySelector('form.event--edit').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCancelClick);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCancelClick);
  }

  get template() {
    return createFormTemplate(this._state, this.#allDestinations);
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmitCallback(this.#parseTask(this._state));
  };

  #onCancelClick = (evt) => {
    evt.preventDefault();
    this.#onCancelClickCallback();
  };

  #parseEvent(event) {
    const currentDestination = this.#allDestinations.find((destination) => (destination.id === event.destination));
    const enabledOffers = event.type ? this.#allOffers.find((offers) => (offers.type === event.type)).offers : [];

    return {
      ...event,
      myDestination: currentDestination,
      myOffers:  event.offers,
      isOffersEnable : enabledOffers.length > 0,
      availableOffers: enabledOffers
    };
  }

  #parseTask(task) {
    const event = {...task};
    event.offers = event.myOffers;
    event.destination = event.myDestination.id;

    delete event.myDestination;
    delete event.myOffers;
    delete event.isOffersEnable;
    delete event.availableOffers;
    return event;
  }
}

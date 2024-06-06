import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { EVENT_TYPES } from '../consts.js';
import { reformatDate } from '../utils/event.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const DEFAULT_SETTING_FLATPICKR = {
  enableTime: true,
  dateFormat: 'd/m/y H:i',
  minuteIncrement: 1
};

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


const createFormTemplate = (event, allDestinations, allOffers) => {
  const {id, basePrice, dateFrom, dateTo, destination, offers, type} = event;
  const startDate = reformatDate(dateFrom);
  const endDate = reformatDate(dateTo);
  const myDestination = allDestinations.find((item) => item.id === destination);
  const availableOffers = type ? allOffers.find((item) => item.type === type).offers : [];
  const isOffersEnable = availableOffers.length > 0;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        ${createHeader(id, basePrice, startDate.dateHoursMinute, endDate.dateHoursMinute, myDestination, allDestinations, type)}

        ${isOffersEnable || myDestination
      ? `
        <section class="event__details">
          ${isOffersEnable ? createOffers(availableOffers, offers) : ''}
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
  #dateFromFlatpickr = null;
  #dateToFlatpickr = null;

  constructor({event = EMPTY_EVENT, offers, destinations, onFormSubmit, onCancelClick}) {
    super();
    this._state = {...event};
    this.#allOffers = offers;
    this.#allDestinations = destinations;

    this.#onFormSubmitCallback = onFormSubmit;
    this.#onCancelClickCallback = onCancelClick;
    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(this._state, this.#allDestinations, this.#allOffers);
  }

  _restoreHandlers() {
    this.element.querySelector('form.event--edit').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onCancelClick);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCancelClick);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#onDestinationChange);
    this.element.querySelector('#event-price-1').addEventListener('input', this.#onPriceInput);

    const availableOffersElement = this.element.querySelector('.event__available-offers');
    if (availableOffersElement) {
      availableOffersElement.addEventListener('click', this.#onOfferClick);
    }

    this.#setDatePicker();
  }

  resetState(event) {
    this.updateElement(event);
  }


  #setDatePicker() {
    this.#removeDatePicker();

    this.#dateFromFlatpickr = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        ...DEFAULT_SETTING_FLATPICKR,
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onChange: this.#onDateFromChange,
      },
    );

    this.#dateToFlatpickr = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        ...DEFAULT_SETTING_FLATPICKR,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#onDateToChange
      },
    );
  }

  #removeDatePicker() {
    if (this.#dateFromFlatpickr) {
      this.#dateFromFlatpickr.destroy();
      this.#dateFromFlatpickr = null;
    }
    if (this.#dateToFlatpickr) {
      this.#dateToFlatpickr.destroy();
      this.#dateToFlatpickr = null;
    }
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#onFormSubmitCallback({...this._state});
  };

  #onCancelClick = (evt) => {
    evt.preventDefault();
    this.#onCancelClickCallback();
  };

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#allDestinations.find((destination) => destination.name === evt.target.value);

    this.updateElement({
      destination: selectedDestination ? selectedDestination.id : null
    });
  };

  #onPriceInput = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number.isInteger(+evt.target.value) ? +evt.target.value : 0
    });
  };

  #onDateFromChange = ([selectedDate]) => {
    this._setState({
      dateFrom: selectedDate.toISOString()
    });

    this.#dateToFlatpickr.set('minDate', selectedDate);
  };

  #onDateToChange = ([selectedDate]) => {
    this._setState({
      dateTo: selectedDate.toISOString()
    });

    this.#dateFromFlatpickr.set('maxDate', selectedDate);
  };

  #onOfferClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    let selectedOffers = [...this._state.offers];

    if (evt.target.checked) {
      selectedOffers.push(evt.target.id);
    } else {
      selectedOffers = selectedOffers.filter((offer) => offer !== evt.target.id);
    }

    this.updateElement({
      offers: selectedOffers
    });
  };
}

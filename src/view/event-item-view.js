import AbstractView from '../framework/view/abstract-view';
import { reformatDate, calculateDuration } from '../utils/event.js';
import { capitalizeFirstLetter } from '../utils/common.js';


const createSelectedOffers = (allowedOffers, selectedOffers) =>
  allowedOffers.map((offer) =>
    selectedOffers.includes(offer.id)
      ? `
        <li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </li>
      `
      : ''
  ).join('');

const createEventItemTemplate = (event, allOffers, allDestinations) => {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, offers, type} = event;

  const startDate = reformatDate(dateFrom);
  const endDate = reformatDate(dateTo);
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';
  const currentDestination = allDestinations.find((item) => (item.id === destination));
  const typeOffers = allOffers.find((item) => (item.type === type)).offers;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${startDate.yearMonthDay}">${startDate.monthDay}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalizeFirstLetter(type)} ${currentDestination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startDate.dateTHoursMinute}">${startDate.hourMinute}</time>
            &mdash;
            <time class="event__end-time" datetime="${endDate.dateTHoursMinute}">${endDate.hourMinute}</time>
          </p>
          <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createSelectedOffers(typeOffers, offers)}
        </ul>

        <button class="event__favorite-btn ${favoriteClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventItemView extends AbstractView {
  #event = null;
  #allOffers = null;
  #allDestinations = null;
  #onRollupButtonClickCallback = null;
  #onFavoriteButtonClickCallback = null;

  constructor({event, offers, destinations, onRollupButtonClick, onFavoriteButtonClick}) {
    super();
    this.#event = event;
    this.#allOffers = offers;
    this.#allDestinations = destinations;
    this.#onRollupButtonClickCallback = onRollupButtonClick;
    this.#onFavoriteButtonClickCallback = onFavoriteButtonClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupButtonClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonClick);
  }

  get template() {
    return createEventItemTemplate(this.#event, this.#allOffers, this.#allDestinations);
  }

  #onRollupButtonClick = (evt) => {
    evt.preventDefault();
    this.#onRollupButtonClickCallback();
  };

  #onFavoriteButtonClick = (evt) => {
    evt.preventDefault();
    this.#onFavoriteButtonClickCallback({...this.#event, isFavorite: !this.#event.isFavorite});
  };
}

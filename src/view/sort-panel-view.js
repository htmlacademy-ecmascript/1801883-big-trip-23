import AbstractView from '../framework/view/abstract-view';
import { SortTypes } from '../consts.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const createSortItem = (type, isChecked) => `
  <div class="trip-sort__item  trip-sort__item--${type.name}">
    <input
      id="sort-${type.name}"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${type.name}"
      ${isChecked ? 'checked' : ''}
      ${type.default}
    >
    <label class="trip-sort__btn" for="sort-${type.name}">${type.name === 'offer' ? 'Offers' : capitalizeFirstLetter(type.name)}</label>
  </div>
`;

const createSortPanelTemplate = (sortTypes, currentType) => `
<form class="trip-events__trip-sort trip-sort" action="#" method="get">
  ${sortTypes.map((type) => createSortItem(type, type.name === currentType)).join('')}
</form>
`;

export default class SortPanelView extends AbstractView {
  #currentSortType = null;
  #onSortTypeChangeCallback = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#onSortTypeChangeCallback = onSortTypeChange;
    this.element.addEventListener('change', this.#onSortTypeClick);
  }

  get template() {
    return createSortPanelTemplate(Object.values(SortTypes), this.#currentSortType);
  }

  #onSortTypeClick = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.#onSortTypeChangeCallback(evt.target.value.replace('sort-', ''));
    }
  };
}

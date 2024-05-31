import AbstractView from '../framework/view/abstract-view';
import { SortTypes } from '../consts.js';
import { capitalizeFirstLetter } from '../utils/common.js';

const createSortItem = ({name, isDisabled}, isChecked) => `
  <div class="trip-sort__item  trip-sort__item--${name}">
    <input
      id="sort-${name}"
      class="trip-sort__input  visually-hidden"
      type="radio" name="trip-sort"
      value="sort-${name}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    >
    <label class="trip-sort__btn" for="sort-${name}">${name === 'offer' ? 'Offers' : capitalizeFirstLetter(name)}</label>
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
    this.element.addEventListener('change', this.#onSortTypeChange);
  }

  get template() {
    return createSortPanelTemplate(Object.values(SortTypes), this.#currentSortType);
  }

  #onSortTypeChange = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.#onSortTypeChangeCallback(evt.target.value.replace('sort-', ''));
    }
  };
}

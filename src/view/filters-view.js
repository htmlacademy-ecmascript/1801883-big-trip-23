import AbstractView from '../framework/view/abstract-view';
import { Filters } from '../consts.js';
import { capitalizeFirstLetter } from '../utils.js';


const createFilterItem = (type, isChecked, isDisabled) => `
  <div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${isChecked ? 'checked' : '' }
      ${isDisabled ? 'disabled' : '' }
    >

    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
`;

const createFiltersTemplate = (currentFilter, filteredEvents) => `
<form class="trip-filters" action="#" method="get">
  ${Object.values(Filters)
    .map((filter) => createFilterItem(filter.name, filter.name === currentFilter, filteredEvents[filter.name].length === 0))
    .join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;


export default class FiltersView extends AbstractView {
  #currentFilter = null;
  #filteredEvents = null;

  constructor({currentFilter, filteredEvents}) {
    super();
    this.#currentFilter = currentFilter.toLowerCase();
    this.#filteredEvents = filteredEvents;
  }

  get template() {
    return createFiltersTemplate(this.#currentFilter, this.#filteredEvents);
  }
}

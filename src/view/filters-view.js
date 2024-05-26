import AbstractView from '../framework/view/abstract-view';
import { Filters } from '../consts.js';
import { capitalizeFirstLetter } from '../utils.js';


const createFilterItem = (type) => `
  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"${type === 'everything' ? ' checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
  </div>
`;

const createFiltersTemplate = () => `
<form class="trip-filters" action="#" method="get">
  ${Object.values(Filters).map((filter) => createFilterItem(filter.name)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>
`;


export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}

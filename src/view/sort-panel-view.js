import AbstractView from '../framework/view/abstract-view';

const SORT_TYPES = [
  {name: 'day', default: 'checked'},
  {name: 'event', default: 'disabled'},
  {name: 'time', default: ''},
  {name: 'price', default: ''},
  {name: 'offer', default: 'disabled'}
];

const createSortItem = (type) => `
  <div class="trip-sort__item  trip-sort__item--${type.name}">
    <input id="sort-${type.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type.name}"${type.default}>
    <label class="trip-sort__btn" for="sort-${type.name}">${type.name === 'offer' ? 'Offers' : type.name}</label>
  </div>
`;

const createSortPanelTemplate = () => `
<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORT_TYPES.map((value) => createSortItem(value)).join('')}
</form>
`;

export default class SortPanelView extends AbstractView {
  get template() {
    return createSortPanelTemplate();
  }
}

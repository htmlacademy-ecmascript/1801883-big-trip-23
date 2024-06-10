import Observable from '../framework/observable.js';
import { Filters, UpdateType } from '../consts.js';


export default class FilterModel extends Observable {
  #filter = Filters.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  set filter(selectedFilter) {
    this.#filter = selectedFilter;
    this._notify(UpdateType.MAJOR, selectedFilter);
  }
}

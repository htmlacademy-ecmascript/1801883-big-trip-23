import { RenderPosition, render } from './framework/render.js';
import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortPanelView from './view/sort-panel-view.js';
import EventsPresenter from './presenter/events-presenter.js';
import EventsModel from './model/events-model.js';

const headerContainerElement = document.querySelector('.trip-main');
const filtersContainerElement = headerContainerElement.querySelector('.trip-controls__filters');
const mainContainerElement = document.querySelector('.trip-events');


render(new TripInfoView(), headerContainerElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainerElement);
render(new SortPanelView(), mainContainerElement);

const eventsModel = new EventsModel;
const eventsPresenter = new EventsPresenter({
  eventsContainer: mainContainerElement,
  model: eventsModel,
});
eventsPresenter.init();

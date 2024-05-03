import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import SortPanelView from './view/sort-panel-view.js';
import WorkspaceView from './view/workspace-view.js';
import EventView from './view/event-view.js';
import { RenderPosition, render } from './render.js';

const EVENTS_NUMBER = 3;

const headerContainerElement = document.querySelector('.trip-main');
const filtersContainerElement = headerContainerElement.querySelector('.trip-controls__filters');
const mainContainerElement = document.querySelector('.trip-events');


render(new TripInfoView(), headerContainerElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainerElement);
render(new SortPanelView(), mainContainerElement);
// render(new WorkspaceView(), mainContainerElement);
const tempContainer = new WorkspaceView();
render(tempContainer, mainContainerElement);
for (let index = 0; index < EVENTS_NUMBER; index++) {
  render(new EventView(), tempContainer.getElement());
}


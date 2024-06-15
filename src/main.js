import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

const filterModel = new FilterModel;
const eventsModel = new EventsModel;

const headerPresenter = new HeaderPresenter(
  {
    tripInfoContainer: document.querySelector('.trip-main'),
    filtersContainer: document.querySelector('.trip-controls__filters'),
    filterModel: filterModel,
    eventsModel: eventsModel
  }
);

const tripPresenter = new TripPresenter(
  {
    eventsContainer: document.querySelector('.trip-events'),
    newEventButton: document.querySelector('.trip-main__event-add-btn'),
    filterModel: filterModel,
    eventsModel: eventsModel
  }
);

headerPresenter.init();
tripPresenter.init();

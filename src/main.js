import EventsModel from './model/events-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';


const eventsModel = new EventsModel;

const headerPresenter = new HeaderPresenter(
  {
    tripInfoContainer: document.querySelector('.trip-main'),
    filtersContainer: document.querySelector('.trip-controls__filters'),
    eventsModel: eventsModel,
  }
);

const tripPresenter = new TripPresenter(
  {
    eventsContainer: document.querySelector('.trip-events'),
    eventsModel: eventsModel,
  }
);

headerPresenter.init();
tripPresenter.init();

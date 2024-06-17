import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsApiService from './model/events-api-service.js';
import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';

const AUTHORIZATION = 'Basic avr228w590ik29889a';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const newEventButtonElement = document.querySelector('.trip-main__event-add-btn');
const filterModel = new FilterModel;
const eventsModel = new EventsModel({eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)});

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
    newEventButton: newEventButtonElement,
    filterModel: filterModel,
    eventsModel: eventsModel
  }
);

eventsModel.init()
  .then(() => newEventButtonElement.toggleAttribute('disabled', false));

headerPresenter.init();
tripPresenter.init();

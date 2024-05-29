import { RenderPosition, render } from '../framework/render.js';
import { Filters } from '../consts.js';
import EventsListView from '../view/events-list-view.js';
import SortPanelView from '../view/sort-panel-view.js';
import EmptyListView from '../view/empty-list-view';
import EventPresenter from './event-presenter.js';


export default class EventsPresenter {
  #eventsContainerElement = null;
  #model = null;
  #emptyListView = null;
  #sortPanelView = new SortPanelView();
  #eventsListView = new EventsListView();
  #eventPresenters = new Map();

  #destinations = [];
  #offers = [];
  #events = [];
  #currentFilter = Filters.EVERYTHING.name;

  constructor ({eventsContainer, eventsModel}) {
    this.#eventsContainerElement = eventsContainer;
    this.#model = eventsModel;
  }

  #renderEmptyList() {
    this.#emptyListView = new EmptyListView({currentFilter: this.#currentFilter});
    render(this.#emptyListView, this.#eventsContainerElement);
  }

  #renderSortPanel() {
    render(this.#sortPanelView, this.#eventsContainerElement, RenderPosition.AFTERBEGIN);
  }

  #renderEvent(event) {
    const taskPresenter = new EventPresenter({eventsListContainer: this.#eventsListView.element});
    this.#eventPresenters.set(event.id, taskPresenter);

    taskPresenter.init(event, this.#offers, this.#destinations);
  }

  #renderEventsList() {
    render(this.#eventsListView, this.#eventsContainerElement);
    this.#events.forEach((item) => this.#renderEvent(item));
  }

  init() {
    this.#destinations = [...this.#model.destinations];
    this.#offers = [...this.#model.offers];
    this.#events = [...this.#model.events];

    if (this.#events.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSortPanel();
    this.#renderEventsList();

    //_________________________________________________________
    //_________________________________________________________
    //_________________________________________________________
    // !Для проверки. Удалить
    const onButtonClick = () => {
      // const tempEvent = {
      //   id: 'gghh-1',
      //   basePrice: 111,
      //   dateFrom: new Date(),
      //   dateTo: new Date(),
      //   destination: 'destenation-2',
      //   isFavorite: false,
      //   offers: [],
      //   type: 'flight'
      // };

      this.#eventPresenters.get(this.#events[1].id).init(this.#events[0]);
    };


    const button = document.querySelector('.trip-main__event-add-btn');
    button.addEventListener('click', onButtonClick);
    //_________________________________________________________
    //_________________________________________________________
    //_________________________________________________________
  }
}

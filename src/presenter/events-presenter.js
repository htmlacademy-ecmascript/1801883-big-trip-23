import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';
import { render } from '../render.js';

const EVENTS_NUMBER = 3;


export default class EventsPresenter {

  eventsList = new EventsListView();

  constructor ({eventsContainer}) {
    this.eventsContainerElement = eventsContainer;
  }

  init () {
    render(this.eventsList, this.eventsContainerElement);
    render(new FormView, this.eventsList.getElement());

    for (let i = 0; i < EVENTS_NUMBER; i++) {
      render(new EventItemView(), this.eventsList.getElement());
    }
  }
}

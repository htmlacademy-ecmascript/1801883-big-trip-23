import EventsListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import NewFormView from '../view/form/new-form-view.js';
import HeaderFormView from '../view/form/header-form-view.js';
import OffersFormView from '../view/form/offers-form-view.js';
import OfferItemFormView from '../view/form/offer-item-form-view.js';
import DestinationFormView from '../view/form/destination-form-view.js';
import { RenderPosition, render } from '../render.js';

const EVENTS_NUMBER = 3;


export default class EventsPresenter {

  constructor (mainContainerElement) {
    this.mainContainerElement = mainContainerElement;
  }

  eventsContainer = new EventsListView();
  newForm = new NewFormView();
  eventDetailsContainer = this.newForm.getElement().firstElementChild.firstElementChild;
  offersForm = new OffersFormView();

  init () {
    render(this.eventsContainer, this.mainContainerElement);
    render(this.newForm, this.eventsContainer.getElement());

    render(new HeaderFormView(), this.newForm.getElement().firstElementChild, RenderPosition.AFTERBEGIN);
    render(this.offersForm, this.eventDetailsContainer);
    render(new OfferItemFormView, this.offersForm.getElement().children[1]);
    render(new DestinationFormView, this.eventDetailsContainer);

    for (let index = 0; index < EVENTS_NUMBER; index++) {
      render(new EventItemView(), this.eventsContainer.getElement());
    }
  }
}

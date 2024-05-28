import { render, replace } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';


export default class EventPresenter {
  #eventsListContainerElement = null;
  #eventItemView = null;
  #formEditView = null;

  #event = null;
  #destinations = [];
  #offers = [];
  #isEditMode = false;

  constructor ({eventsListContainer}) {
    this.#eventsListContainerElement = eventsListContainer;
  }

  #renderEvent() {
    this.#eventItemView = new EventItemView(
      {
        event: this.#event,
        offers: this.#offers,
        destinations: this.#destinations,
        onRollupButtonClick: this.#switchEventAndForm
      }
    );

    this.#formEditView = new FormView(
      {
        event: this.#event,
        offers: this.#offers,
        destinations: this.#destinations,
        onFormSubmit: this.#switchEventAndForm,
        onCancelClick: this.#switchEventAndForm
      }
    );

    render(this.#eventItemView, this.#eventsListContainerElement);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchEventAndForm();
    }
  };

  #switchEventAndForm = () => {
    let newComponent;
    let oldComponent;

    if (this.#isEditMode) {
      newComponent = this.#eventItemView;
      oldComponent = this.#formEditView;
      document.removeEventListener('keydown', this.#onEscKeydown);
    } else {
      newComponent = this.#formEditView;
      oldComponent = this.#eventItemView;
      document.addEventListener('keydown', this.#onEscKeydown);
    }
    this.#isEditMode = !this.#isEditMode;
    replace(newComponent, oldComponent);
  };

  init(event, offers, destinations) {
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#renderEvent();
  }
}

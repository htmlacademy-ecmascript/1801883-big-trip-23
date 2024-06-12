import { RenderPosition, render, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../consts.js';
import FormView from '../view/form-view.js';


export default class NewEventPresenter {
  #eventsListContainerElement = null;
  #newEventButtonElement = null;
  #onEventAddCallback = null;
  #onFormCloseCallback = null;
  #formEditView = null;

  #destinations = [];
  #offers = [];

  constructor ({eventsListContainer, newEventButtonElement, onEventAdd, onFormClose}) {
    this.#eventsListContainerElement = eventsListContainer;
    this.#newEventButtonElement = newEventButtonElement;
    this.#onEventAddCallback = onEventAdd;
    this.#onFormCloseCallback = onFormClose;
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  init(offers, destinations) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#newEventButtonElement.toggleAttribute('disabled', true);

    this.#renderNewEventForm();
  }

  destroy() {
    remove(this.#formEditView);
    this.#newEventButtonElement.toggleAttribute('disabled', false);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  #renderNewEventForm() {
    this.#formEditView = new FormView(
      {
        offers: this.#offers,
        destinations: this.#destinations,
        onFormSubmit: this.#onFormSubmit,
        onCancelClick: this.#onFormClose
      }
    );

    render(this.#formEditView, this.#eventsListContainerElement, RenderPosition.AFTERBEGIN);
  }

  #onFormSubmit = (updatedEvent) => {
    this.#onEventAddCallback(UserAction.ADD, UpdateType.MAJOR, {id: 'new-event', ...updatedEvent});
    this.destroy();
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#onFormClose();
    }
  };

  #onFormClose = () => {
    this.destroy();
    this.#onFormCloseCallback();
  };
}

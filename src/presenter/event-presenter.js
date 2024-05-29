import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';


export default class EventPresenter {
  #eventsListContainerElement = null;
  #onEventChangeCallback = null;
  #eventItemView = null;
  #formEditView = null;

  #event = null;
  #destinations = [];
  #offers = [];
  #isEditMode = false;

  constructor ({eventsListContainer, onEventChange}) {
    this.#eventsListContainerElement = eventsListContainer;
    this.#onEventChangeCallback = onEventChange;
  }

  #renderEvent() {
    const prevEventItemView = this.#eventItemView;
    const prevFormEditView = this.#formEditView;

    this.#eventItemView = new EventItemView(
      {
        event: this.#event,
        offers: this.#offers,
        destinations: this.#destinations,
        onRollupButtonClick: this.#switchEventAndForm,
        onFavoriteButtonClick: this.#onFavoriteButtonClick
      }
    );

    this.#formEditView = new FormView(
      {
        event: this.#event,
        offers: this.#offers,
        destinations: this.#destinations,
        onFormSubmit: this.#onFormSubmit,
        onCancelClick: this.#switchEventAndForm
      }
    );


    if (prevEventItemView === null && prevFormEditView === null) {
      render(this.#eventItemView, this.#eventsListContainerElement);
      return;
    }

    if (this.#eventsListContainerElement.contains(prevEventItemView.element)) {
      replace(this.#eventItemView, prevEventItemView);
    }

    if (this.#eventsListContainerElement.contains(prevFormEditView.element)) {
      replace(this.#formEditView, prevFormEditView);
    }

    remove(prevEventItemView);
    remove(prevFormEditView);
  }

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

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchEventAndForm();
    }
  };

  #onFavoriteButtonClick = (updatedEvent) => {
    this.#onEventChangeCallback(updatedEvent);
  };

  #onFormSubmit = (updatedEvent) => {
    this.#onEventChangeCallback(updatedEvent);
    this.#switchEventAndForm();
  };


  init(event, offers, destinations) {
    this.#event = event;
    this.#offers = offers ?? this.#offers;
    this.#destinations = destinations ?? this.#destinations;

    this.#renderEvent();
  }

  destroy() {
    remove(this.#eventItemView);
    remove(this.#formEditView);
  }
}

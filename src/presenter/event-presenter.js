import { render, replace, remove } from '../framework/render.js';
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
    const prevEventItemView = this.#eventItemView;
    const prevFormEditView = this.#formEditView;

    this.#eventItemView = new EventItemView(
      {
        event: this.#event,
        offers: this.#offers,
        destinations: this.#destinations,
        onRollupButtonClick: this.#switchEventAndForm,
        onFavoriteButtonClick: this.#switchEventAndForm
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
    this.#offers = offers ?? this.#offers;
    this.#destinations = destinations ?? this.#destinations;

    this.#renderEvent();
  }

  destroy() {
    remove(this.#eventItemView);
    remove(this.#formEditView);
  }
}

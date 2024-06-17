import { render, replace, remove } from '../framework/render.js';
import { UserAction, UpdateType } from '../consts.js';
import { isDatesEqual } from '../utils/event.js';
import EventItemView from '../view/event-item-view.js';
import FormView from '../view/form-view.js';


export default class EventPresenter {
  #eventsListContainerElement = null;
  #closeAllFormsCallback = null;
  #onEventUpdateCallback = null;
  #eventItemView = null;
  #formEditView = null;

  #event = null;
  #destinations = [];
  #offers = [];
  #isEditMode = false;

  constructor ({eventsListContainer, onEventUpdate, closeAllForms}) {
    this.#eventsListContainerElement = eventsListContainer;
    this.#closeAllFormsCallback = closeAllForms;
    this.#onEventUpdateCallback = onEventUpdate;
  }


  init(event, offers = this.#offers, destinations = this.#destinations) {
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#renderEvent();
  }

  closeForm () {
    if (this.#isEditMode) {
      this.#switchEventAndForm();
    }
  }

  destroy() {
    remove(this.#eventItemView);
    remove(this.#formEditView);
    document.removeEventListener('keydown', this.#onEscKeydown);
  }

  setSaving() {
    // if (this.#mode === Mode.EDITING) {
    //   this.#taskEditComponent.updateElement({
    //     isDisabled: true,
    //     isSaving: true,
    //   });
    // }
  }

  setDeleting() {
    // if (this.#mode === Mode.EDITING) {
    //   this.#taskEditComponent.updateElement({
    //     isDisabled: true,
    //     isDeleting: true,
    //   });
    // }
  }

  setAborting() {
    if (!this.#isEditMode) {
      this.#eventItemView.shake();
      return;
    }

    // const resetFormState = () => {
    //   this.#taskEditComponent.updateElement({
    //     isDisabled: false,
    //     isSaving: false,
    //     isDeleting: false,
    //   });
    // };

    // this.#formEditView.shake(resetFormState);
    this.#formEditView.shake();
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
        onCancelClick: this.#switchEventAndForm,
        onDeleteClick: this.#onDeleteClick
      }
    );

    if (prevEventItemView === null && prevFormEditView === null) {
      render(this.#eventItemView, this.#eventsListContainerElement);
      return;
    }

    if (this.#isEditMode) {
      replace(this.#formEditView, prevFormEditView);
    } else {
      replace(this.#eventItemView, prevEventItemView);
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
      this.#formEditView.resetState(this.#event);
    } else {
      newComponent = this.#formEditView;
      oldComponent = this.#eventItemView;
      this.#closeAllFormsCallback();
      document.addEventListener('keydown', this.#onEscKeydown);
    }
    this.#isEditMode = !this.#isEditMode;
    replace(newComponent, oldComponent);
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#formEditView.resetState(this.#event);
      this.#switchEventAndForm();
    }
  };

  #onFavoriteButtonClick = (updatedEvent) => {
    this.#onEventUpdateCallback(UserAction.UPDATE, UpdateType.MINOR, updatedEvent);
  };

  #onFormSubmit = (updatedEvent) => {
    const isMajorUpdate =
      this.#event.basePrice !== updatedEvent.basePrice ||
      !isDatesEqual(this.#event.dateFrom, updatedEvent.dateFrom) ||
      !isDatesEqual(this.#event.dateTo, updatedEvent.dateTo);

    this.#onEventUpdateCallback(UserAction.UPDATE, isMajorUpdate ? UpdateType.MAJOR : UpdateType.MINOR, updatedEvent);
  };

  #onDeleteClick = (deletedEvent) => {
    this.#onEventUpdateCallback(UserAction.DELETE, UpdateType.MAJOR, deletedEvent);
  };
}

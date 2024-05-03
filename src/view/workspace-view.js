import { createElement } from '../render.js';


const createWorkspaceTemplate = () => '<ul class="trip-events__list"></ul>';

export default class WorkspaceView {
  getTemplate() {
    return createWorkspaceTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

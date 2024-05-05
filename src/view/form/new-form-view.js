import { createElement } from '../../render';


const createNewFormTemplate = () => `
<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <section class="event__details">
    </section>
  </form>
</li>
`;


export default class NewFormView {
  getTemplate() {
    return createNewFormTemplate();
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

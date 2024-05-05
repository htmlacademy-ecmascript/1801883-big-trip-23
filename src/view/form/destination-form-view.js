import { createElement } from '../../render';

const IMAGE_LINKS = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];


const createImageDestination = (imageLink) => `
  <img class="event__photo" src="img/photos/${imageLink}" alt="Event photo"></img>
`;

const createDestinationFormTemplate = () => `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${IMAGE_LINKS.map((value) => createImageDestination(value)).join('')}
      </div>
    </div>
  </section>
`;


export default class DestinationFormView {
  getTemplate() {
    return createDestinationFormTemplate();
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

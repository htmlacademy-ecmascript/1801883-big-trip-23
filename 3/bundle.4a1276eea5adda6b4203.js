(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}const n=["everything","future","present","past"],s=[{name:"day",default:"checked"},{name:"event",default:"disabled"},{name:"time",default:""},{name:"price",default:""},{name:"offer",default:"disabled"}];class i{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class l{getTemplate(){return'\n<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="2019-03-18">MAR 18</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">Taxi Amsterdam</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>\n        &mdash;\n        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>\n      </p>\n      <p class="event__duration">30M</p>\n    </div>\n    <p class="event__price">\n      &euro;&nbsp;<span class="event__price-value">20</span>\n    </p>\n    <h4 class="visually-hidden">Offers:</h4>\n    <ul class="event__selected-offers">\n      <li class="event__offer">\n        <span class="event__offer-title">Order Uber</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">20</span>\n      </li>\n    </ul>\n    <button class="event__favorite-btn event__favorite-btn--active" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n</li>\n'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const a=document.querySelector(".trip-main"),r=a.querySelector(".trip-controls__filters"),m=document.querySelector(".trip-events");t(new class{getTemplate(){return'\n<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n    <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  </div>\n\n  <p class="trip-info__cost">\n    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n  </p>\n</section>\n'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},a,"afterbegin"),t(new class{getTemplate(){return`\n<form class="trip-filters" action="#" method="get">\n  ${n.map((e=>{return`\n  <div class="trip-filters__filter">\n    <input id="filter-${t=e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t}"${"everything"===t?" checked":""}>\n    <label class="trip-filters__filter-label" for="filter-${t}">${t}</label>\n  </div>\n`;var t})).join("")}\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>\n`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},r),t(new class{getTemplate(){return`\n<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  ${s.map((e=>{return`\n  <div class="trip-sort__item  trip-sort__item--${(t=e).name}">\n    <input id="sort-${t.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${t.name}"${t.default}>\n    <label class="trip-sort__btn" for="sort-${t.name}">${"offer"===t.name?"Offers":t.name}</label>\n  </div>\n`;var t})).join("")}\n</form>\n`}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},m),new class{eventsList=new i;constructor({eventsContainer:e}){this.eventsContainerElement=e}init(){t(this.eventsList,this.eventsContainerElement);for(let e=0;e<3;e++)t(new l,this.eventsList.getElement())}}({eventsContainer:m}).init()})();
//# sourceMappingURL=bundle.4a1276eea5adda6b4203.js.map
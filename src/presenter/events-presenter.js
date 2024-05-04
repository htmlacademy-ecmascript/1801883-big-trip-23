import WorkspaceView from '../view/workspace-view.js';
import EventView from '../view/event-view.js';
import { render } from '../render.js';

const EVENTS_NUMBER = 3;


export default class EventsPresenter {
  workspaceContainer = new WorkspaceView();

  constructor (mainContainerElement) {
    this.mainContainerElement = mainContainerElement;
  }

  init () {
    render(this.workspaceContainer, this.mainContainerElement);

    for (let index = 0; index < EVENTS_NUMBER; index++) {
      render(new EventView(), this.workspaceContainer.getElement());
    }
  }
}

'use strict';

import { AbstractState } from './abstractState.js';

export class StoredState extends AbstractState {
  locationId = null;

  constructor(item) {
    super();
    this.item = item;
  }

  activate(id) {
    if (this.item.state === 'delivered') {
      throw new Error('Warehouse item cannot be moved back to stored once it is delivered!');
    }
    this.item.state = 'stored';
    this.locationId = id;
    return;
  }

  describe() {
    return `Item ${this.item.id} in location ${this.locationId}`;
  }
}
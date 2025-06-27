'use strict';

import { ArrivingState } from './arrivingState.js';
import { DeliveredState } from './deliveredState.js';
import { StoredState } from './storedState.js';

export class WarehouseItem {
  constructor(id, state) {
    if (state !== 'arrived') {
      throw new Error('Must be of state arriving first!');
    }

    this.id = id;
    this.state = state;
    this.states = {
      arrived: new ArrivingState(this),
      stored: new StoredState(this),
      delivered: new DeliveredState(this),
    }
    this.states['arrived'].activate();
  }

  store(locationId) {
    this.states['stored'].activate(locationId);
  }

  deliver(address) {
    this.states['delivered'].activate(address);
  }

  describe() {
    return this.states[this.state].describe();
  }
}
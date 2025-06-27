'use strict';

import { AbstractState } from './abstractState.js';

export class ArrivingState extends AbstractState {
  constructor(item) {
    super();
    this.item = item;
  }

  activate() {
    if (this.item.state !== 'arrived') {
      throw new Error('Arriving can be set only at the start!');
    }
    this.item.state = 'arrived';
  }

  describe() {
    return `Item ${this.item.id} is on its way to the warehouse`;
  }
}
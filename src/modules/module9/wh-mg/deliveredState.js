'use strict';

import { AbstractState } from './abstractState.js';

export class DeliveredState extends AbstractState {
  address = null;

  constructor(item) {
    super();
    this.item = item;
  }

  activate(address) {
    if (this.item.state !== 'stored') {
      throw new Error('Item has to be stored first before it is delivered!');
    }
    this.item.state = 'delivered';
    this.address = address;
    return;
  }

  describe() {
    return `Item ${this.item.id} was delivered to ${this.address}`;
  }
}
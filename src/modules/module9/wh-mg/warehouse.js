'use strict';

export class WarehouseItem {
  locationId = null;
  deliveryAddress = null;

  constructor(id, state) {
    this.id = id;
    this.state = state;
  }

  store(locationId) {
    this.state = 'stored';
    this.locationId = locationId; 
  }

  deliver(address) {
    this.state = 'delivered';
    this.deliveryAddress = address;
    this.locationId = null;
  }

  describe() {
    switch (this.state) {
      case 'arriving':
        return `Item ${this.id} is on its way to the warehouse`;
      case 'stored':
        return `Item ${this.id} in location ${this.locationId}`;
      case 'delivered':
        return `Item ${this.id} was delivered to ${this.deliveryAddress}`;
      default:
        return ``;
    }
  }
}
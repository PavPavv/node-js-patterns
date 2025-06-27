'use strict';

import { WarehouseItem } from './warehouseItem.js';

function main() {
  const item = new WarehouseItem(1, 'arrived');
  console.log(item.describe());
  item.store(123456);
  console.log(item.describe());
  item.deliver('Samara, 443048');
  console.log(item.describe());
}
main();
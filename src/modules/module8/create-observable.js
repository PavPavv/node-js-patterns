export const createObservable = (target, observer) => {
  const proxyHandler = {
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        observer({ prop, prev, curr: value });
      }
      return true;
    }
  };
  return new Proxy(target, proxyHandler);
};

const calcTotal = (invoice) => {
  return invoice.subtotal - invoice.discount + invoice.tax;
};

const invoice = {
  subtotal: 120,
  discount: 10,
  tax: 20,
};
let total = calcTotal(invoice);

console.log('start total: ', total);

const invoiceObserver = ({ prop, prev, curr }) => {
  total = calcTotal(invoice);
  console.log(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`);
};
const observableInvoice = createObservable(invoice, invoiceObserver);
observableInvoice.subtotal = 200;
observableInvoice.discount = 20;
observableInvoice.discount = 20;
observableInvoice.tax = 30;

console.log(`Final total:  ${total}`);
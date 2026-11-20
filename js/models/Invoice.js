import { Emitter } from '../utils/emitter.js';
import { LineItem } from './LineItem.js';

/**
 * Invoice data and maths. Knows nothing about the DOM.
 * Events: 'items' (a row was added or removed) and 'change' (any value changed).
 */
export class Invoice extends Emitter {
  constructor({ issued, due, currency = '$', taxRate = 0, items = [] } = {}) {
    super();
    this.issued = issued;
    this.due = due;
    this.currency = currency;
    this.taxRate = taxRate;
    this.items = items.map((item) => new LineItem(item));
  }

  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  get taxAmount() {
    return (this.subtotal * (Number(this.taxRate) || 0)) / 100;
  }

  get total() {
    return this.subtotal + this.taxAmount;
  }

  addItem(data) {
    const item = new LineItem(data);
    this.items.push(item);
    this.emit('items', this.items);
    this.emit('change', this);
    return item;
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.emit('items', this.items);
    this.emit('change', this);
  }

  updateItem(id, patch) {
    const item = this.items.find((entry) => entry.id === id);
    if (!item) return;
    Object.assign(item, patch);
    this.emit('change', this);
  }

  setTaxRate(rate) {
    this.taxRate = Number(rate) || 0;
    this.emit('change', this);
  }

  setCurrency(symbol) {
    this.currency = symbol;
    this.emit('change', this);
  }
}

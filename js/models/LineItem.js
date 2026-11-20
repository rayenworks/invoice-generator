let nextId = 1;

export class LineItem {
  constructor({ description = '', qty = 1, price = 0 } = {}) {
    this.id = nextId++;
    this.description = description;
    this.qty = qty;
    this.price = price;
  }

  get total() {
    return (Number(this.qty) || 0) * (Number(this.price) || 0);
  }
}

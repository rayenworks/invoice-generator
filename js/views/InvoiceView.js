import { money } from '../utils/format.js';

export class InvoiceView {
  constructor(root) {
    this.root = root;
    this.rows = root.querySelector('#rows');
    this.addButton = root.querySelector('#addRow');
    this.taxInput = root.querySelector('#taxRate');
    this.issued = root.querySelector('#issued');
    this.due = root.querySelector('#due');
    this.subtotal = root.querySelector('#subtotal');
    this.taxAmount = root.querySelector('#taxAmount');
    this.total = root.querySelector('#total');
  }

  bind({ onAdd, onRemove, onItem, onTax }) {
    this.addButton.addEventListener('click', onAdd);
    this.taxInput.addEventListener('input', (e) => onTax(e.target.value));

    this.rows.addEventListener('input', (e) => {
      const row = e.target.closest('tr');
      const field = e.target.dataset.field;
      if (!row || !field) return;
      const value = field === 'description' ? e.target.textContent : e.target.value;
      onItem(Number(row.dataset.id), field, value);
    });

    this.rows.addEventListener('click', (e) => {
      const button = e.target.closest('[data-remove]');
      if (button) onRemove(Number(button.closest('tr').dataset.id));
    });
  }

  renderDates({ issued, due }) {
    this.issued.value = issued;
    this.due.value = due;
  }

  renderItems(items) {
    this.rows.replaceChildren(...items.map((item) => this.#row(item)));
  }

  renderTotals(invoice) {
    const { currency } = invoice;
    this.rows.querySelectorAll('tr').forEach((row) => {
      const item = invoice.items.find((entry) => entry.id === Number(row.dataset.id));
      if (item) row.querySelector('.line-total').textContent = money(item.total, currency);
    });
    this.subtotal.textContent = money(invoice.subtotal, currency);
    this.taxAmount.textContent = money(invoice.taxAmount, currency);
    this.total.textContent = money(invoice.total, currency);
  }

  #row(item) {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    row.innerHTML = `
      <td><div contenteditable="true" data-field="description" data-ph="Description"></div></td>
      <td class="q"><input data-field="qty" type="number" min="0"></td>
      <td class="n"><input class="n" data-field="price" type="number" min="0" step="0.01"></td>
      <td class="n line-total"></td>
      <td class="x"><button type="button" data-remove aria-label="Remove item">×</button></td>`;
    row.querySelector('[data-field=description]').textContent = item.description;
    row.querySelector('[data-field=qty]').value = item.qty;
    row.querySelector('[data-field=price]').value = item.price;
    return row;
  }
}

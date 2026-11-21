export class InvoiceController {
  constructor(invoice, view) {
    this.invoice = invoice;
    this.view = view;

    view.bind({
      onAdd: () => invoice.addItem({}),
      onRemove: (id) => invoice.removeItem(id),
      onItem: (id, field, value) => invoice.updateItem(id, { [field]: value }),
      onTax: (value) => invoice.setTaxRate(value),
    });

    invoice.on('items', (items) => view.renderItems(items));
    invoice.on('change', () => view.renderTotals(invoice));

    view.renderDates(invoice);
    view.renderItems(invoice.items);
    view.renderTotals(invoice);
  }
}

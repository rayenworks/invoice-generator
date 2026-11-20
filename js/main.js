import { $ } from './utils/dom.js';
import { addDays, isoDate } from './utils/format.js';
import { flashOnView } from './utils/flashOnView.js';
import { THEMES, DEFAULT_THEME } from './config/themes.js';
import { Invoice } from './models/Invoice.js';
import { InvoiceView } from './views/InvoiceView.js';
import { ThemeMenuView } from './views/ThemeMenuView.js';
import { InvoiceController } from './controllers/InvoiceController.js';
import { ThemeController } from './controllers/ThemeController.js';
import { ToolbarController } from './controllers/ToolbarController.js';

const paper = $('#paper');
const stage = $('#stage');

const today = new Date();
const invoice = new Invoice({
  issued: isoDate(today),
  due: isoDate(addDays(today, 30)),
  items: [
    { description: 'Design work', qty: 1, price: 500 },
    { description: 'Consultation (hours)', qty: 2, price: 80 },
  ],
});

new InvoiceController(invoice, new InvoiceView(paper));

new ThemeController({
  themes: THEMES,
  view: new ThemeMenuView($('#themeMenu'), THEMES),
  targets: [paper, stage],
  initial: DEFAULT_THEME,
});

new ToolbarController({
  invoice,
  currencySelect: $('#currency'),
  downloadButton: $('#print'),
  paper,
});

flashOnView(paper);

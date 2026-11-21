import { exportPdf } from '../utils/exportPdf.js';

export class ToolbarController {
  constructor({ invoice, currencySelect, downloadButton, paper }) {
    currencySelect.value = invoice.currency;
    currencySelect.addEventListener('change', (e) => invoice.setCurrency(e.target.value));

    downloadButton.addEventListener('click', async () => {
      const label = downloadButton.textContent;
      downloadButton.disabled = true;
      downloadButton.textContent = 'Preparing…';
      try {
        const number = paper.querySelector('#invoiceNumber')?.textContent.trim() || 'invoice';
        await exportPdf(paper, `${number}.pdf`);
      } finally {
        downloadButton.disabled = false;
        downloadButton.textContent = label;
      }
    });
  }
}
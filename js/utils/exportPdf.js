
export async function exportPdf(element, filename = 'invoice.pdf') {
  const root = document.documentElement;
  root.classList.add('exporting'); 
  try {
    await html2pdf()
      .set({
        margin: 0,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#ffffff', scrollY: 0 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  } finally {
    root.classList.remove('exporting');
  }
}
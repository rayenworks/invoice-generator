/** The designs offered in the style menu. Each id needs a matching css/themes/<id>.css. */
const SYSTEM = '-apple-system, system-ui, sans-serif';

export const THEMES = [
  { id: 'classic',   label: 'Classic',   tagline: 'Serif, timeless, quiet',          font: 'Georgia, serif',                                  weight: 400 },
  { id: 'studio',    label: 'Studio',    tagline: 'Dark and bold',                   font: SYSTEM,                                            weight: 800 },
  { id: 'glass',     label: 'Glass',     tagline: 'Frosted layers, soft light',      font: SYSTEM,                                            weight: 500 },
  { id: 'ledger',    label: 'Ledger',    tagline: 'Monospace, like a receipt',       font: 'ui-monospace, Menlo, monospace',                  weight: 400 },
  { id: 'sheet',     label: 'Sheet',     tagline: 'Big rounded card, big total',     font: SYSTEM,                                            weight: 600 },
  { id: 'tinted',    label: 'Tinted',    tagline: 'One calm colour, washed over',    font: SYSTEM,                                            weight: 500 },
  { id: 'playful',   label: 'Playful',   tagline: 'Chunky borders, pink shadow',     font: 'ui-rounded, Nunito, system-ui, sans-serif',       weight: 900 },
  { id: 'editorial', label: 'Editorial', tagline: 'Magazine headline, red accent',   font: "'Bodoni 72', Didot, Georgia, serif",              weight: 800 },
  { id: 'brutalist', label: 'Brutalist', tagline: 'Thick black lines, yellow label', font: "'Helvetica Neue', Arial, sans-serif",             weight: 900 },
  { id: 'corporate', label: 'Corporate', tagline: 'Navy, structured, trustworthy',   font: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", weight: 600 },
];

export const DEFAULT_THEME = 'classic';

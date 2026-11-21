export class ThemeController {
  constructor({ themes, view, targets, initial }) {
    this.themes = themes;
    this.view = view;
    this.targets = targets;

    view.onSelect((id) => this.select(id));
    this.select(initial);
  }

  select(id) {
    const theme = this.themes.find((entry) => entry.id === id) ?? this.themes[0];
    this.targets.forEach((el) => { el.dataset.design = theme.id; });
    this.view.setActive(theme);
  }
}

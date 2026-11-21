export class ThemeMenuView {
  #button;
  #list;
  #themes;
  #onSelect = () => {};

  constructor(root, themes) {
    this.#themes = themes;
    this.#button = root.querySelector('.ddb');
    this.#list = root.querySelector('.ddl');

    themes.forEach((theme) => this.#list.append(this.#item(theme)));

    this.#button.addEventListener('click', () => (this.#list.hidden ? this.open() : this.close()));
    document.addEventListener('pointerdown', (e) => { if (!root.contains(e.target)) this.close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.#list.hidden) { this.close(); this.#button.focus(); }
    });
  }

  onSelect(fn) {
    this.#onSelect = fn;
  }

  setActive(theme) {
    this.#button.innerHTML = this.#thumb(theme) + this.#label(theme) + '<span class="chev">⌄</span>';
    this.#list.querySelectorAll('li').forEach((li) => {
      li.setAttribute('aria-selected', String(li.dataset.id === theme.id));
    });
  }

  open() {
    this.#list.hidden = false;
    this.#button.setAttribute('aria-expanded', 'true');
    (this.#list.querySelector('[aria-selected="true"]') ?? this.#list.firstElementChild).focus();
  }

  close() {
    this.#list.hidden = true;
    this.#button.setAttribute('aria-expanded', 'false');
  }

  #item(theme) {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.tabIndex = -1;
    li.dataset.id = theme.id;
    li.innerHTML = this.#thumb(theme) + this.#label(theme);

    li.addEventListener('click', () => {
      this.#onSelect(theme.id);
      this.close();
      this.#button.focus();
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); (li.nextElementSibling ?? li).focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); (li.previousElementSibling ?? li).focus(); }
    });
    return li;
  }

  #thumb(theme) {
    return `<span class="th th--${theme.id}"><i></i><i></i><i></i></span>`;
  }

  #label(theme) {
    return `<span class="nm"><b style="font-family:${theme.font};font-weight:${theme.weight}">${theme.label}</b><small>${theme.tagline}</small></span>`;
  }
}

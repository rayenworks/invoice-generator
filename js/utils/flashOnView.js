export function flashOnView(element, { threshold = 0.35, duration = 1800 } = {}) {
  const observer = new IntersectionObserver(([entry], obs) => {
    if (!entry.isIntersecting) return;
    element.classList.add('flash');
    setTimeout(() => element.classList.remove('flash'), duration);
    obs.disconnect();
  }, { threshold });
  observer.observe(element);
}

export function getElements(root, elements) {
  root.querySelectorAll('[data-element]').forEach((element) => {
    if (element instanceof HTMLElement) {
      const key = element.dataset.element;
      elements[key] = element;
    }
  });
}

export function setupFilterDropdowns() {
  const filterLabels = document.querySelectorAll('.filter__label');

  filterLabels.forEach(label => {
    label.addEventListener('click', () => {
      const filter = label.parentElement;
      filter.classList.toggle('active');

      const icon = label.querySelector('i');

      if (filter.classList.contains('active')) {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
      } else {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      }
    });
  });
}

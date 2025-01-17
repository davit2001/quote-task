export const getQuoteCategoryQuery = () => {
  const checkboxes = document.querySelectorAll('.quote-filters input[type="checkbox"]');
  const categoryList = Array.from(checkboxes).reduce((acc, checkbox) => {
    if (checkbox.checked) {
      acc.push(checkbox.parentNode.textContent.trim());
    }

    return acc;
  }, []);

  return categoryList.join('|');
}

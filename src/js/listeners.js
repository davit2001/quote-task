import { changeStorageValue } from './quote-storage.js';
import { getQuoteCategoryQuery } from './utils.js';
import { getQuotesByCategory } from './data-fetching.js';
import { render, renderEmptyQuoteList, renderErrorQuoteList, renderQuoteList } from './render.js';

const checkboxes = document.querySelectorAll('.quote-filters input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', async event => {
    changeStorageValue('categories', {
      isChecked: event.target.checked,
      label: event.target.parentNode.textContent.trim()
    });
    const categoryQuery = getQuoteCategoryQuery();

    const quoteList = await getQuotesByCategory(categoryQuery);
    render({
      onSuccess: renderQuoteList,
      onError: renderErrorQuoteList,
      onEmpty: renderEmptyQuoteList,
      data: quoteList
    });
  });
});
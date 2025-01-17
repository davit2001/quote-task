import { getQuotesByCategory,  } from './data-fetching.js';
import { getStorageValue } from './quote-storage.js';
import './listeners.js';


export const renderQuoteList = (quoteListData) => {
  const quoteList = document.querySelector('.quote-list');
    quoteList.innerHTML = '';
    quoteListData.forEach(quote => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');
    const quoteListItem = document.createElement('li');
    quoteListItem.classList.add('quote-list-item');
    quoteListItem.textContent = `❛❛ ${quote.content} ❜❜`;

    const link = document.createElement('a');
    link.href = `https://www.linkedin.com/shareArticle?text=${quote.content} - ${quote.author}`;
    link.textContent = 'Share on LinkedIn';
    link.classList.add('share-button');
    link.target = '_blank';

    itemContainer.appendChild(quoteListItem);
    itemContainer.appendChild(link);
    quoteList.appendChild(itemContainer);
  });
}

export const renderEmptyQuoteList = () => {
  const quoteList = document.querySelector('.quote-list');
  quoteList.innerHTML = '';
  const quoteListItem = document.createElement('li');
  quoteListItem.classList.add('quote-list-item');
  quoteListItem.textContent = 'No quotes found';
  quoteList.appendChild(quoteListItem);
}

export const renderErrorQuoteList = () => {
  const quoteList = document.querySelector('.quote-list');
  quoteList.innerHTML = '';
  const quoteListItem = document.createElement('li');
  quoteListItem.classList.add('quote-list-item error');
  quoteListItem.textContent = 'Error fetching quotes';
  quoteList.appendChild(quoteListItem);
}

export const render = ({ onSuccess, onError, onEmpty, data }) => {
  try {
    if (data.length === 0) {
      onEmpty();
    } else {
      onSuccess(data);
    }
  } catch (error) {
    onError();
  }
}

const markInitialCategories = () => {
  const categoryList = getStorageValue('categories');
  const checkboxes = document.querySelectorAll('.quote-filters input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    const category = categoryList.find(category => category.label === checkbox.parentNode.textContent.trim());
    if (category?.isChecked) {
      checkbox.checked = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const categoryList = getStorageValue('categories');
  const filteredCategoryList = categoryList.reduce((acc, category) => {
    if (category?.isChecked) {
      acc.push(category.label);
    }

    return acc;
  }, []);
  markInitialCategories();

  const quoteListData = await getQuotesByCategory(filteredCategoryList.join('|'));
  render({
    onSuccess: renderQuoteList,
    onError: renderErrorQuoteList,
    onEmpty: renderEmptyQuoteList,
    data: quoteListData
  });
});
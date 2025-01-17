export const changeStorageValue = (key, value) => {
  const storageOldValue = localStorage.getItem(key);
  const parsedOldValue = storageOldValue ? JSON.parse(storageOldValue) : [];

  const updatedOptions = parsedOldValue.some(item => item.label === value.label)
    ? parsedOldValue.map(item => item.label === value.label ? { ...item, ...value } : item)
    : [...parsedOldValue, value];

  localStorage.setItem(key, JSON.stringify(updatedOptions));
}

export const getStorageValue = (key) => {
  const storageValue = localStorage.getItem(key);
  if (!storageValue) {
    return [];
  }

  return JSON.parse(storageValue);
}
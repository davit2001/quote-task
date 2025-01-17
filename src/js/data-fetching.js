export const getQuotesByCategory = async (category, limit = 5) => {
  const response = await fetch(`https://api.quotable.io/quotes?tags=${category}&limit=${limit}`);
  const data = await response.json();
  return data.results;
}
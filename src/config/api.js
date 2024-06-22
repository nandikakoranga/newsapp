const API_DOMAIN = "https://gnews.io/api/v4/top-headlines?country=";
const API_SEARCH_DOMAIN = "https://gnews.io/api/v4/search?q=";
const API_DETAILS_URL = "https://gnews.io/api/v4/article";
const API_KEY = "45fdf55a51fa667367cbcfeae0dbe9c0";
export const endpointPath = (country, category, page = 1, pageSize = 10) =>
  `${API_DOMAIN}${country}&lang=en&category=${category}&page=${page}&pageSize=${pageSize}&apikey=${API_KEY}`;
export const endpointSearch = (searchQuery) =>
  `${API_SEARCH_DOMAIN}${searchQuery}&lang=en&apikey=${API_KEY}`;
export const endpointDetails = (id) =>
  ` ${API_DOMAIN}${id}?apiKey = ${API_KEY}`; 

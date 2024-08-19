const deleteTokens = () => {
  document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  document.cookie = 'Refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
};

export default deleteTokens;

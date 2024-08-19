const getRedirectParams = () => {
  const params = new URLSearchParams();
  params.set('from', window.location.pathname);

  return params;
};

export default getRedirectParams;

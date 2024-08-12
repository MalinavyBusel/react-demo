import { redirect } from 'react-router-dom';
import getCookie from './getCookie';
import getRedirectParams from './getRedirectParams';
import deleteTokens from './deleteTokens';

const updateJwtTokens = () => {
  const refreshToken = (getCookie('Refresh') ?? ' ').split(' ')[1];
  const reqBody = JSON.stringify({ refreshToken });

  return fetch('http://localhost:3000/auth/refresh', {
    method: 'POST',
    body: reqBody,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
};

const createOptionsWithHeader = (options: RequestInit) => {
  const token = getCookie('Authorization');
  const authHeader = token ? { Authorization: token! } : undefined;

  return {
    ...options,
    ...(authHeader && { headers: { ...authHeader, ...options.headers } }),
  };
};

const fetchResource = async (url: string, options: RequestInit = { method: 'GET' }) => {
  const optionsObj = createOptionsWithHeader(options);
  console.log('fetching first time');

  const resourceResponse = await fetch(url, optionsObj);
  if (resourceResponse.status !== 401) {
    return resourceResponse;
  }

  console.log('access token not valid, trying to refresh');
  const tokensUpdateResponse = await updateJwtTokens();
  if (tokensUpdateResponse.status !== 401) {
    console.log('refresh responded', tokensUpdateResponse);

    return fetch(url, createOptionsWithHeader(options));
  }

  deleteTokens();
  const redirectPath = `/login?${getRedirectParams().toString()}`;
  console.log('refresh token not valid, redirecting to', redirectPath);
  window.location.replace(redirectPath);

  return redirect(redirectPath);
};

export default fetchResource;

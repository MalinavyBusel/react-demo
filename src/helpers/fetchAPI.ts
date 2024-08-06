function getCookie(cookieName: string) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${cookieName.replace(
        /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
        '\\$1',
      )}=([^;]*)`,
    ),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default async function fetchResource(url: string, options: RequestInit = { method: 'GET' }) {
  const token = getCookie('Authorization');
  const authHeader = token ? { Authorization: token! } : undefined;
  const optionsObj = {
    ...options,
    ...(authHeader && { headers: { ...authHeader, ...options.headers } }),
  };

  return fetch(url, optionsObj);
}

import fetchResource from '../fetchAPI';

const findBanks = async (limit?: number, offset?: number) => {
  const banksResponse = await fetchResource('http://localhost:3000/bank/find', {
    method: 'POST',
    body: JSON.stringify({
      limit,
      offset,
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
  if (!banksResponse.ok) {
    throw new Error('bad request');
  }

  return banksResponse.json();
};

export default findBanks;

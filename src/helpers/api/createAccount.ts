import { FieldValues } from 'react-hook-form';
import fetchResource from '../fetchAPI';

const createAccount = async (values: FieldValues) => {
  const createResp = await fetchResource('http://localhost:3000/account/create', {
    method: 'POST',
    body: JSON.stringify({
      ...values,
      amount: 0,
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
  if (!createResp.status) {
    throw new Error('unable to create account');
  }

  return createResp.json();
};

export default createAccount;

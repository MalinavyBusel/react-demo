import { AccountDto } from '../../dto/AccountDto';
import fetchResource from '../fetchAPI';

const updateAccount = async (account: AccountDto) => {
  const updateResponse = await fetchResource(`http://localhost:3000/account/${account.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      amount: Number(account.amount),
      currency: account.currency,
    }),
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
  if (!updateResponse.ok) {
    throw new Error(`unable to update account, status ${updateResponse.status}`);
  }

  return updateResponse;
};

export default updateAccount;

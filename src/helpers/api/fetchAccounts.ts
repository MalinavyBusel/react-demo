import { AccountDto } from '../../dto/AccountDto';
import fetchResource from '../fetchAPI';

const fetchAccounts = async (setAccounts: (value: React.SetStateAction<AccountDto[]>) => void) => {
  const accountsResponse = await fetchResource('http://localhost:3000/client/accounts');
  if (accountsResponse.status === 200) {
    const data = await accountsResponse.json();
    setAccounts(data.accounts);
  }
};

export default fetchAccounts;

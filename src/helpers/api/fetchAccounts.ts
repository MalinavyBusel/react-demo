import { AccDto } from '../../components/Account/Account';
import fetchResource from '../fetchAPI';

const fetchAccounts = async (setAccounts: (value: React.SetStateAction<AccDto[]>) => void) => {
  const accountsResponse = await fetchResource('http://localhost:3000/client/accounts');
  if (accountsResponse.status === 200) {
    const data = await accountsResponse.json();
    setAccounts(data.accounts);
  }
};

export default fetchAccounts;

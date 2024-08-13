import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import Account from '../Account/Account';
import { AccountDto } from '../../dto/AccountDto';
import fetchResource from '../../helpers/fetchAPI';
import AccountCreationForm from '../AccountCreationForm/AccountCreationForm';
import fetchAccounts from '../../helpers/api/fetchAccounts';
import compareAccounts from '../../helpers/compareAccounts';

function Accounts() {
  const [accs, setAccs] = useState<AccountDto[]>([]);
  useEffect(() => {
    fetchAccounts(setAccs);
  }, []);

  const handleDelete = (id: string) => {
    fetchResource(`http://localhost:3000/account/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchAccounts(setAccs);
      });
  };

  const handleCreate = (values: FieldValues) => {
    fetchResource('http://localhost:3000/account/create', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        amount: 0,
      }),
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
      .then(() => {
        fetchAccounts(setAccs);
      });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>BankId</th>
            <th>Currency</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {accs!.sort(compareAccounts)
            .map((account) => (
              <Account
                account={account}
                onDelete={() => handleDelete(account.id)}
                onUpdate={() => fetchAccounts(setAccs)}
              />
            ))}
        </tbody>
      </table>
      <ul>
        {accs!.sort(compareAccounts)
          .map((account) => (
            <li key={account.id}>
              <Account
                account={account}
                onDelete={() => handleDelete(account.id)}
                onUpdate={() => fetchAccounts(setAccs)}
              />
            </li>
          ))}
      </ul>
      <button type="button">New</button>
      <AccountCreationForm onFormSubmit={handleCreate} />
    </>
  );
}

export default Accounts;

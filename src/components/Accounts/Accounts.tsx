import { useEffect, useReducer, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Account, AccDto } from '../Account/Account';
import fetchResource from '../../helpers/fetchAPI';
import AccountCreationForm from '../AccountCreationForm/AccountCreationForm';
import fetchAccounts from '../../helpers/api/fetchAccounts';

function Accounts() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [accs, setAccs] = useState<AccDto[]>([]);
  useEffect(() => {
    fetchAccounts(setAccs);
  }, []);

  const handleDelete = (id: string) => {
    fetchResource(`http://localhost:3000/account/${id}`, { method: 'DELETE' })
      .then(() => {
        forceUpdate();
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
        forceUpdate();
      });
  };

  return (
    <>
      <b>There is something about your profile</b>
      <ul>
        {accs!.map((account) => (
          <li key={account.id}>
            <Account account={account} onDelete={() => handleDelete(account.id)} />
          </li>
        ))}
      </ul>
      <button>New</button>
      <AccountCreationForm onFormSubmit={handleCreate} />
    </>
  );
}

export default Accounts;

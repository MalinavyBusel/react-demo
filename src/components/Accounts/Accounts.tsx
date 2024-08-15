import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import Account from '../Account/Account';
import { AccountDto } from '../../dto/AccountDto';
import fetchResource from '../../helpers/fetchAPI';
import AccountCreationForm from '../AccountCreationForm/AccountCreationForm';
import fetchAccounts from '../../helpers/api/fetchAccounts';
import compareAccounts from '../../helpers/compareAccounts';
import './Accounts.css';
import createAccount from '../../helpers/api/createAccount';

function Accounts() {
  const [accs, setAccs] = useState<AccountDto[]>([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  useEffect(() => {
    fetchAccounts(setAccs);
  }, []);
  const changeFormVisibility = () => setCreateFormVisible(!createFormVisible);

  const handleDelete = (id: string) => {
    fetchResource(`http://localhost:3000/account/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchAccounts(setAccs);
      });
  };

  const handleCreate = async (values: FieldValues) => {
    await createAccount(values);
    await fetchAccounts(setAccs);
    setCreateFormVisible(!createFormVisible);
  };

  return (
    <>
      <div className="accounts-table-wrapper">
        <table className="accounts-table">
          <thead>
            <tr>
              <th className="first-column-cell">Id</th>
              <th>BankId</th>
              <th>Currency</th>
              <th className="amount-column">Amount</th>
              <th className="edit-column" />
              <th />
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
      </div>
      <button type="button" className="new-account-button" onClick={changeFormVisibility}>New</button>
      {createFormVisible
        && <AccountCreationForm onFormSubmit={handleCreate} onCancel={changeFormVisibility} />}
    </>
  );
}

export default Accounts;

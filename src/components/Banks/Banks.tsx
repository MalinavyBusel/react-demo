import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Bank, BankDto } from '../Bank/Bank';
import findBanks from '../../helpers/api/findBanks';
import './Banks.css';
import AccountCreationForm from '../AccountCreationForm/AccountCreationForm';
import createAccount from '../../helpers/api/createAccount';

function Banks() {
  const [banks, setBanks] = useState<BankDto[]>([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [createdBankId, setCreatedBankId] = useState('');
  const changeFormVisibility = () => setCreateFormVisible(!createFormVisible);
  const fetchBanks = async (limit?: number, offset?: number) => {
    const fetchBody = await findBanks(limit, offset);
    setBanks(fetchBody.banks);
  };
  useEffect(() => { fetchBanks(); }, []);
  const handleCreate = async (values: FieldValues) => {
    await createAccount(values);
    changeFormVisibility();
  };

  return (
    <div className="banks-table-wrapper">
      <table className="banks-table">
        <thead>
          <tr>
            <th className="first-column-cell">Id</th>
            <th>Bank Name</th>
            <th className="number-column">Entity Commission</th>
            <th className="number-column">Individual Commission</th>
            <th className="new-account" />
          </tr>
        </thead>
        <tbody>
          {banks.map((bank: BankDto) => (
            <Bank
              bank={bank}
              onAccountCreate={() => {
                setCreatedBankId(bank.id);
                changeFormVisibility();
              }}
            />
          ))}
        </tbody>
      </table>
      {createFormVisible && (
        <AccountCreationForm
          onFormSubmit={handleCreate}
          onCancel={changeFormVisibility}
          bankId={createdBankId}
        />
      )}
    </div>
  );
}

export default Banks;

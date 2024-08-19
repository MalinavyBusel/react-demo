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
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const fetchBanks = async (limit?: number, offset?: number) => {
    const fetchBody = await findBanks(limit, offset);
    setBanks(fetchBody.banks);
    setRecordsCount(fetchBody.recordsCount);
  };
  const fetchCurrentPage = () => fetchBanks(5, (currentPage - 1) * 5);
  const handleCreate = async (values: FieldValues) => {
    await createAccount(values);
    changeFormVisibility();
  };
  useEffect(() => { fetchCurrentPage(); }, [currentPage]);

  return (
    <>
      <div className="banks-table-wrapper">
        <table className="banks-table">
          <thead>
            <tr>
              <th className="first-column-cell">Id</th>
              <th className="second-column-cell">Bank Name</th>
              <th className="number-column">Entity Commission</th>
              <th className="number-column">Individual Commission</th>
              <th className="new-account" />
            </tr>
          </thead>
          <tbody>
            {banks.map((bank: BankDto) => (
              <Bank
                key={bank.id}
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
      <div className="pagenums-line">
        {Array.from(
          { length: recordsCount / 5 + (recordsCount % 5 !== 0 ? 1 : 0) },
          (_, i) => i + 1,
        ).map((i: number) => (
          <div
            key={i}
            className={`pagenum-container${i === currentPage ? ' current-page' : ''}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </div>
        ))}
      </div>
    </>

  );
}

export default Banks;

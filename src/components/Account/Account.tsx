import { useState } from 'react';
import './Account.css';
import { useForm } from 'react-hook-form';
import { AccountDto } from '../../dto/AccountDto';
import updateAccount from '../../helpers/api/updateAccount';

type AccountInputProps = {
  account: AccountDto;
  onDelete: () => void;
  onUpdate: () => Promise<void>
};

function Account({ account, onDelete, onUpdate }: AccountInputProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const {
    id, bankId, currency, amount,
  } = account;
  const { register, handleSubmit } = useForm<AccountDto>({
    values: { ...account },
  });
  const onFormSubmit = async (acc: AccountDto) => {
    try {
      await updateAccount(acc);
      setIsBeingEdited(false);
      onUpdate();
    } catch (err) {
      console.log(`error while trying to update account: ${err}`);
    }
  };

  return (
    <tr className="account-row">
      <td className="first-column-cell">
        {id}
      </td>
      <td>
        {bankId}
      </td>
      <td>
        {isBeingEdited ? (
          <select
            className="account-update-input"
            defaultValue={currency}
            {...register('currency')}
          >
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="EUR">EUR</option>
          </select>
        ) : currency}
      </td>
      <td className="amount-input-row">
        {isBeingEdited ? (
          <input
            className="account-update-number amount-input"
            type="number"
            defaultValue={amount}
            {...register('amount')}
          />
        ) : amount}
      </td>
      <td>
        {isBeingEdited
          && (
            <div onClick={handleSubmit(onFormSubmit)} className="account-row-button update-ok-button">
              <i className="fa-solid fa-check scale-me" />
            </div>
          )}
        <div className="account-row-button" onClick={() => setIsBeingEdited(!isBeingEdited)}>
          {isBeingEdited ? <i className="fa-solid fa-xmark scale-me" /> : <i className="fa-solid fa-pen" />}
        </div>
      </td>
      <td>
        <div className="account-row-button delete-button" onClick={onDelete}>
          <i className="fa-solid fa-trash" />
        </div>
      </td>
    </tr>
  );
}

export default Account;

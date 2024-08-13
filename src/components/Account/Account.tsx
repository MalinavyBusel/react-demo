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
    <div className="account">
      {!isBeingEdited && (
      <div className="account-props-container">
        <h4 className="account-prop">{`Account id: ${id}`}</h4>
        <p className="account-prop">{`bankId: ${bankId}`}</p>
        <p className="account-prop">{`currency: ${currency}`}</p>
        <p className="account-prop">{`amount: ${amount}`}</p>
      </div>
      )}
      {isBeingEdited && (
        <form
          className="account-update-form"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <input className="account-update-input" disabled defaultValue={id} {...register('id')} />
          <input className="account-update-input" disabled defaultValue={bankId} {...register('bankId')} />
          <select className="account-update-input" defaultValue={currency} {...register('currency')}>
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="EUR">EUR</option>
          </select>
          <input className="account-update-input" type="number" defaultValue={amount} {...register('amount')} />
          <button type="submit">Apply</button>
        </form>
      )}
      <button
        type="button"
        onClick={() => setIsBeingEdited(!isBeingEdited)}
      >
        {isBeingEdited ? 'Cancel' : 'Edit'}
      </button>
      <button type="button" onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Account;

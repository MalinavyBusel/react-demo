import { useForm, FieldValues } from 'react-hook-form';
import './AccountCreationForm.css';

type FormInputProps = {
  onFormSubmit: (values: FieldValues) => void;
  onCancel: () => void;
};

function AccountCreationForm({ onFormSubmit, onCancel }: FormInputProps) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="popup-container">
      <form className="account-creation-form" onSubmit={handleSubmit(onFormSubmit)}>
        <i className="fa-solid fa-xmark cancel-account-create" onClick={onCancel} />
        <input className="create-account-input" placeholder="bank id" {...register('bankId')} />
        <select className="create-account-select" {...register('currency')}>
          <option value="USD">USD</option>
          <option value="RUB">RUB</option>
          <option value="EUR">EUR</option>
        </select>
        <input type="submit" value="Create" className="create-account-button" />
      </form>
    </div>

  );
}

export default AccountCreationForm;

import { useForm, FieldValues } from 'react-hook-form';

type FormInputProps = {
  onFormSubmit: (values: FieldValues) => void;
};

export default function AccountCreationForm({ onFormSubmit }: FormInputProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <input {...register('bankId')} />
      <select {...register('currency')}>
        <option value="USD">USD</option>
        <option value="RUB">RUB</option>
        <option value="EUR">EUR</option>
      </select>
      <input type="submit" />
    </form>
  );
}

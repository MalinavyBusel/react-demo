import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Bank, BankDto } from '../Bank';
import fetchResource from '../../helpers/fetchAPI';

function Banks() {
  const { register, handleSubmit } = useForm();
  const [bank, setBank] = useState<BankDto | null>(null);
  const getBank = (values: FieldValues) => {
    fetchResource(`http://localhost:3000/bank/${values.bankId}`).then((response) => {
      if (response.status !== 200) {
        return;
      }
      response.json().then((data: { bank: BankDto }) => {
        setBank(data.bank);
      });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(getBank)}>
        <input {...register('bankId')} />
        <input type="submit" />
      </form>
      <Bank bank={bank} />
    </>
  );
}

export default Banks;
